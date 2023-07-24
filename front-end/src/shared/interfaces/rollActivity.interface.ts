export interface StudentRollState {
    roll_state: string;
    student_id: number;
    name: string;
}

export interface Entity {
    completed_at: string;
    id: number;
    name: string;
    student_roll_states: StudentRollState[];
}

export interface Activity {
    date: string;
    type: string;
    entity: Entity;
}

export interface RollActivity {
    success: boolean;
    activity: Activity[];
}