import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Activity, RollActivity } from "shared/interfaces/rollActivity.interface"
import { RollTypes } from "shared/models/roll"

interface Props {
  activity: Activity[]
}

export const AttendanceTableDisplay: React.FC<Props> = ({ activity }) => {
  return (
    <div>
      {activity.length > 0 && (
        <S.Table>
          <S.TableHead>
            <S.TableHeading>Name</S.TableHeading>
                {activity.map((rollData) => {
                  return <S.TableHeading>{rollData.entity.name}</S.TableHeading>
                })}
          </S.TableHead>

          {activity.length > 0 && (
            <>
              {activity[0].entity.student_roll_states.map((rollData, index) => {
                return (
                  <S.TableRow>
                    <S.TableRowData>{rollData.name}</S.TableRowData>

                    {activity.map((act) => {
                      return (
                        <S.TableRowData style={{ color: act.entity.student_roll_states[index].roll_state === RollTypes.ABSENT ? "red" : "" }}>
                          {act.entity.student_roll_states[index].roll_state}
                        </S.TableRowData>
                      )
                    })}
                  </S.TableRow>
                )
              })}
            </>
          )}
        </S.Table>
      )}
    </div>
  )
}

const S = {
  StudentRoll: styled.div``,
  Table: styled.table`
    border-spacing: 0;
    margin: 0;
    width: 100%;
  `,
  TableHead: styled.thead`
    background: #343f64;
    color: white;
    text-align: left;
  `,
  TableHeading: styled.th`
    padding: 15px;
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  `,
  TableRow: styled.tr`
    &:nth-child(odd) {
      background-color: #e3e9ff;
    }
  `,
  TableRowData: styled.td`
    padding: 8px;
    width: 20%;
  `,
}
