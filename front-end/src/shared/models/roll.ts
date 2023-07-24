export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: { student_id: number; roll_state: RolllStateType }[]
}

export interface RollInput {
  student_roll_states: { student_id: number; roll_state: RolllStateType; name: string }[]
}

export type RolllStateType = RollTypes.UNMARK | RollTypes.PRESENT | RollTypes.ABSENT | RollTypes.LATE

export enum RollTypes {
  ALL = "all",
  PRESENT = "present",
  LATE = "late",
  ABSENT = "absent",
  UNMARK = "unmark"
}
