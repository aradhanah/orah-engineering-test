import React, { useState } from "react"
import { Person } from "shared/models/person"
import { RolllStateType, RollTypes } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"

interface Props {
  initialState?: RolllStateType
  size?: number
  onStateChange?: (newState: RolllStateType) => void
  setRoll: (rollState: string) => void
  student: Person
}
export const RollStateSwitcher: React.FC<Props> = ({ size = 40, onStateChange, setRoll, student }) => {
  const getRollStateType = (type: string | undefined) => {
    switch(type) {
      case RollTypes.PRESENT: {
        return RollTypes.PRESENT;
      }
      case RollTypes.LATE: {
        return RollTypes.LATE;
      }
      case RollTypes.ABSENT: {
        return RollTypes.ABSENT;
      }
      default: {
        return RollTypes.UNMARK;
      }
    }
  }

  const [rollState, setRollState] = useState(getRollStateType(student.rollStatus))

  const nextState = () => {
    const states: RolllStateType[] = [RollTypes.PRESENT, RollTypes.LATE, RollTypes.ABSENT]
    if (rollState === RollTypes.UNMARK || rollState === RollTypes.ABSENT) return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    if (onStateChange) {
      onStateChange(next)
    }
    setRoll(next);
  }

  return <RollStateIcon type={getRollStateType(student.rollStatus)} size={size} onClick={onClick} />
}
