import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { sortByNameFunc } from "shared/helpers/sort-util"
import { RollTypes } from "shared/models/roll"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)

  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [saveActiveRoll] = useApi<{ students: Person[] }>({ url: "save-roll" })

  const [sortBy, setSortBy] = useState("asc")
  const [sortByName, setSortByName] = useState("first_name")
  const [text, setText] = useState("")
  const [updateStudentObj, setUpdateStudentObj] = useState(false)
  const [filterByRoll, setFilterByRoll] = useState("all")
  const [studentData, setStudentData] = useState(data)

  useEffect(() => {
    void getStudents({ sortBy, sortByName, text })
  }, [])

  useEffect(() => {
    if (studentData) {
      let mutatedData: any = data
      if (sortByName) {
        let sortedData: any = sortByNameFunc(mutatedData?.students, sortByName)
        let dataSort = sortBy === "asc" ? sortedData : sortedData.reverse()
        mutatedData = { students: dataSort }
      }

      if (text) {
        let search = mutatedData?.students.filter((item: any, index: number) => {
          return item["first_name"].toLowerCase().indexOf(text.toLowerCase()) > -1 || item["last_name"].toLowerCase().indexOf(text.toLowerCase()) > -1
        })
        mutatedData = { students: search }
        let dataSearch: any = {
          students: search,
        }
      }
      setStudentData(mutatedData)
    }
  }, [sortBy, sortByName, text])

  useEffect(() => {
    setStudentData(data)
  }, [data])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "sort") {
      setSortBy(sortBy === "asc" ? "desc" : "asc")
    }
  }

  const resetStudentRoll = () => {
    const studentLength = studentData?.students.length || 0
    for (let i = 0; i < studentLength; i++) {
      if (studentData != undefined && studentData.students[i] != undefined) {
        studentData.students[i].rollStatus = "unmark"
      }
    }
  }
  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      resetStudentRoll()
    }
    if (action === "complete") {
      let studentRollInput = studentData?.students.map((student, index) => {
        return { student_id: student.id, roll_state: student.rollStatus, name: `${student.first_name} ${student.last_name}` }
      })
      studentRollInput?.sort(function (a: any, b: any) {
        var keyA = new Date(a.student_id),
          keyB = new Date(b.student_id)
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
      })
      const params = {
        student_roll_states: studentRollInput,
      }
      saveActiveRoll(params)
      resetStudentRoll()
    }
    setFilterByRoll("all")
    setIsRollMode(false)
  }

  const onChangeText = (value: string) => {
    setText(value)
  }

  const onChangeSortName = (value: string) => {
    setSortByName(value)
  }

  const updateStudentList = () => {
    setUpdateStudentObj(!updateStudentObj)
  }

  const filterStudentsByRoll = (roll: string) => {
    setFilterByRoll(roll)
  }
  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} sortByName={sortByName} sortBy={sortBy} onChangeSortName={onChangeSortName} onChangeText={onChangeText} text={text} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && studentData?.students && (
          <>
            {studentData.students
              .filter((student) => {
                return filterByRoll === RollTypes.ALL ? true : student.rollStatus === filterByRoll
              })
              .map((s) => (
                <StudentListTile key={s.id} isRollMode={isRollMode} student={s} updateStudentList={updateStudentList} />
              ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} studentData={data} filterStudentsByRoll={filterStudentsByRoll} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  sortByName: string
  sortBy: string
  onChangeSortName: (value: string) => void
  onChangeText: (value: string) => void
  text: string
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, sortByName, sortBy, onChangeSortName, onChangeText, text } = props
  return (
    <S.ToolbarContainer>
      <div>
        First Name
        <span style={{ padding: "0 10px" }}>
          <FontAwesomeIcon icon={sortBy === "asc" ? "sort-alpha-down" : "sort-alpha-up"} size="sm" style={{ cursor: "pointer" }} onClick={() => onItemClick("sort")} />
        </span>
        <select value={sortByName} onChange={(e) => onChangeSortName(e.target.value)}>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
        </select>
      </div>
      <div>
        <input type="text" placeholder="Search" value={text} onChange={(e) => onChangeText(e.target.value)} />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
