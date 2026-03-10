import { Study } from "./study";

export interface Milestone {
    id: string; // e.g., "MS0010101"
    studyId: string; // e.g., "STD00101"
    name: string; // e.g., "First Patient In"
    plannedDate: Date; // ISO date string
    actualDate?: Date; // ISO date string (optional)
    status: 'Not Started' | 'On Track' | 'At Risk' | 'Completed' | 'Delayed' | string;
    study: Study
}
