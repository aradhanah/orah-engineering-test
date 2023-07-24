import React, { useState } from "react"
import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
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
      case "present": {
        return "present";
      }
      case "late": {
        return "late";
      }
      case "absent": {
        return "absent";
      }
      default: {
        return "unmark";
      }
    }
  }

  const [rollState, setRollState] = useState(getRollStateType(student.rollStatus))

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
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
