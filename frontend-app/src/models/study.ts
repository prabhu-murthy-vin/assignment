import { Milestone } from "./milestone";
import { Program } from "./program";

export interface Study {
    id: string; // e.g., "STD00101"
    programId: string; // e.g., "PRG001"
    name: string; // e.g., "Study-1-1"
    phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Phase IV' | string; // Study phase
    type: 'Observational' | 'Interventional' | 'Expanded Access' | string; // Study type
    startDate: Date; // ISO date string
    endDate: Date; // ISO date string
    enrollmentStatus: 'Not yet recruiting' | 'Recruiting' | 'Active, not recruiting' | 'Completed' | 'Withdrawn' | 'Terminated' | string;
    targetEnrollment: number; // Target number of participants
    actualEnrollment: number; // Actual number of participants
    principalInvestigator: string; // e.g., "Dr. Lee"
    program: Program;
    milestones: Milestone;
}
