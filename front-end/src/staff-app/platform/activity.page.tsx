import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { RollActivity } from "shared/interfaces/rollActivity.interface"
import { AttendanceTableDisplay } from "./attendance-table-display.component"
export const ActivityPage: React.FC = () => {
  const [getActivitiesData, data] = useApi<RollActivity>({ url: "get-activities" })
  useEffect(() => {
    getActivitiesData()
  }, [])

  return (
    <S.Container>
      <S.PageHeading>
        <h1>Attendance</h1>
      </S.PageHeading>
      <S.StudentRoll>
        {data && data.activity.length > 0 ? (
          <AttendanceTableDisplay activity={data.activity}></AttendanceTableDisplay>
          ) : (
            <S.ErrorMessage>No attendance recorded yet!</S.ErrorMessage>
          )
        }</S.StudentRoll>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    max-height: 600px;
    min-width: 50%;
    max-width: 70%;
    margin: ${Spacing.u4} auto 0;
  `,
  PageHeading: styled.div`
    text-align: center;
  `,
  StudentRoll: styled.div`
    padding: 12px;
    border: 1px solid #d5dbf1;
    border-radius: 8px;
    box-shadow: 5px 4px 14px -8px #000;
    overflow: scroll;
  `,
  ErrorMessage: styled.div`
    text-align: center;
    font-style: italic;
  `
}
