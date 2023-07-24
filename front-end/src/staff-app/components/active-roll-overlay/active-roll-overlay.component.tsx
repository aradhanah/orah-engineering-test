import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { Person } from "shared/models/person"
export type ActiveRollAction = "complete" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
  studentData: { students: Person[] } | undefined
  filterStudentsByRoll: (roll: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick, studentData, filterStudentsByRoll } = props

  const rollPresentLen: any = studentData?.students?.filter((student: Person) => {
    return student.rollStatus === 'present'
  }).length

  const rollLateLen: any = studentData?.students?.filter((student: Person) => {
    return student.rollStatus === 'late'
  }).length

  const rollAbsentLen: any = studentData?.students?.filter((student: Person) => {
    return student.rollStatus === 'absent'
  }).length

  const rollAll = rollPresentLen + rollLateLen + rollAbsentLen;

  const theme = createMuiTheme({
    palette: {
      action: {
        disabled: '#cccccc9e'
      }
    }
  });

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: rollAll || 0 },
              { type: "present", count: rollPresentLen || 0 },
              { type: "late", count: rollLateLen || 0 },
              { type: "absent", count: rollAbsentLen || 0 },
            ]}
            filterStudentsByRoll={filterStudentsByRoll}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <ThemeProvider theme={theme}>
              <Button color="inherit" style={{ border: "1px solid #45507e" }} onClick={() => onItemClick("exit")}>
                Exit
              </Button>
              <Button color="inherit" style={{ marginLeft: Spacing.u2, border: "1px solid #45507e" }} onClick={() => onItemClick("complete")} disabled={rollAll !== studentData?.students.length}>
                Complete
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
