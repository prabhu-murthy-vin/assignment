import { Study } from "./study";

export interface Program {
    id: string; // e.g., "PRG001"
    name: string; // e.g., "Program-1-Thera"
    therapeuticArea: string; // e.g., "Infectious Disease"
    phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Phase IV' | string;
    startDate: Date; // ISO date string
    endDate: Date; // ISO date string
    status: 'Active' | 'On Hold' | 'Completed' | 'Terminated' | string;
    manager: string; // e.g., "Dr. Smith"
    studies: Study[]
}
