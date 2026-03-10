import csv
import random
from datetime import datetime, timedelta

# Configuration
NUM_PROGRAMS = 20
NUM_STUDIES_PER_PROGRAM = 3
NUM_MILESTONES_PER_STUDY = 4

# Lists for random selection
THERAPEUTIC_AREAS = ["Cardiovascular", "Neurology", "Infectious Disease", "Endocrinology", "Respiratory", "Immunology"]
PHASES = ["Discovery", "Preclinical", "Phase I", "Phase II", "Phase III", "Registration", "Post-marketing"]
STUDY_PHASES = ["Phase I", "Phase IIa", "Phase IIb", "Phase III"]
ENROLLMENT_STATUSES = ["Not yet recruiting", "Recruiting", "Enrolling by invitation", "Active, not recruiting", "Completed", "Terminated", "Suspended", "Withdrawn"]
MILESTONE_NAMES = ["First Patient In", "Last Patient Out", "Data Lock", "NDA Submission", "Interim Analysis", "Final Report"]
MANAGERS = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Jones"]
PIS = ["Dr. Lee", "Dr. Patel", "Dr. Garcia", "Dr. Kim", "Dr. Chen"]

# Output files
PROGRAMS_CSV = "./programs.csv"
STUDIES_CSV = "./studies.csv"
MILESTONES_CSV = "./milestones.csv"

def random_date(start, end):
    """Generate a random date between `start` and `end`."""
    return start + timedelta(days=random.randint(0, (end - start).days))

def generate_programs():
    """Generate synthetic program data."""
    with open(PROGRAMS_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["program_id", "name", "therapeutic_area", "phase", "start_date", "end_date", "status", "manager"])
        for i in range(1, NUM_PROGRAMS + 1):
            program_id = f"PRG{i:03d}"
            name = f"Program-{i}-{random.choice(['Thera', 'Bio', 'Pharma', 'Med'])}"
            therapeutic_area = random.choice(THERAPEUTIC_AREAS)
            phase = random.choice(PHASES)
            start_date = random_date(datetime(2020, 1, 1), datetime(2023, 1, 1))
            end_date = random_date(start_date, start_date + timedelta(days=1095))
            status = random.choice(["Active", "On Hold", "Discontinued"])
            manager = random.choice(MANAGERS)
            writer.writerow([
                program_id, name, therapeutic_area, phase,
                start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d"),
                status, manager
            ])

def generate_studies():
    """Generate synthetic study data."""
    with open(STUDIES_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            "study_id", "program_id", "name", "phase", "study_type",
            "start_date", "end_date", "enrollment_status",
            "target_enrollment", "actual_enrollment", "principal_investigator"
        ])
        for i in range(1, NUM_PROGRAMS + 1):
            program_id = f"PRG{i:03d}"
            for j in range(1, NUM_STUDIES_PER_PROGRAM + 1):
                study_id = f"STD{i:03d}{j:02d}"
                name = f"Study-{i}-{j}"
                phase = random.choice(STUDY_PHASES)
                study_type = random.choice(["Interventional", "Observational"])
                start_date = random_date(datetime(2022, 1, 1), datetime(2025, 1, 1))
                end_date = random_date(start_date, start_date + timedelta(days=730))
                enrollment_status = random.choice(ENROLLMENT_STATUSES)
                target_enrollment = random.randint(50, 500)
                actual_enrollment = random.randint(0, target_enrollment)
                pi = random.choice(PIS)
                writer.writerow([
                    study_id, program_id, name, phase, study_type,
                    start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d"),
                    enrollment_status, target_enrollment, actual_enrollment, pi
                ])

def generate_milestones():
    """Generate synthetic milestone data."""
    with open(MILESTONES_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["milestone_id", "study_id", "name", "planned_date", "actual_date", "status"])
        for i in range(1, NUM_PROGRAMS + 1):
            for j in range(1, NUM_STUDIES_PER_PROGRAM + 1):
                study_id = f"STD{i:03d}{j:02d}"
                for k in range(1, NUM_MILESTONES_PER_STUDY + 1):
                    milestone_id = f"MS{i:03d}{j:02d}{k:02d}"
                    name = random.choice(MILESTONE_NAMES)
                    planned_date = random_date(datetime(2023, 1, 1), datetime(2026, 1, 1))
                    actual_date = planned_date - timedelta(days=random.randint(0, 30)) if random.random() < 0.7 else None
                    status = random.choice(["Planned", "In Progress", "Completed", "At Risk", "Delayed"])
                    writer.writerow([
                        milestone_id, study_id, name,
                        planned_date.strftime("%Y-%m-%d"),
                        actual_date.strftime("%Y-%m-%d") if actual_date else "",
                        status
                    ])

if __name__ == "__main__":
    generate_programs()
    generate_studies()
    generate_milestones()
    print(f"Synthetic data generated: {PROGRAMS_CSV}, {STUDIES_CSV}, {MILESTONES_CSV}")
