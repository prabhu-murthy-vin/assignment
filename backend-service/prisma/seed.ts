import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import parse from 'csv-parser';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const prisma = new PrismaClient({ adapter });

async function seed() {
  const programCount = await prisma.program.count();
  if (programCount > 0 && process.env.PRISMA_SEED !== 'true') {
    console.log('Database already seeded. Set PRISMA_SEED=true to re-seed.');
    return;
  }

  // Seed Programs
  const programs = await readCSV('data/scripts/programs.csv');
  for (const program of programs) {
    await prisma.program.create({
      data: {
        id: program.program_id,
        name: program.name,
        therapeuticArea: program.therapeutic_area,
        phase: program.phase,
        startDate: new Date(program.start_date),
        endDate: new Date(program.end_date),
        status: program.status,
        manager: program.manager,
      },
    });
  }
  console.log('Programs seeded.');

  // Seed Studies
  const studies = await readCSV('data/scripts/studies.csv');
  for (const study of studies) {
    await prisma.study.create({
      data: {
        id: study.study_id,
        programId: study.program_id,
        name: study.name,
        phase: study.phase,
        type: study.study_type,
        startDate: new Date(study.start_date),
        endDate: new Date(study.end_date),
        enrollmentStatus: study.enrollment_status,
        targetEnrollment: parseInt(study.target_enrollment, 10),
        actualEnrollment: parseInt(study.actual_enrollment, 10),
        principalInvestigator: study.principal_investigator,
      },
    });
  }
  console.log('Studies seeded.');

  // Seed Milestones
  const milestones = await readCSV('data/scripts/milestones.csv');
  for (const milestone of milestones) {
    await prisma.milestone.create({
      data: {
        id: milestone.milestone_id,
        studyId: milestone.study_id,
        name: milestone.name,
        plannedDate: new Date(milestone.planned_date),
        actualDate: milestone.actual_date ? new Date(milestone.actual_date) : null,
        status: milestone.status,
      },
    });
  }
  console.log('Milestones seeded.');
}

// Helper function to read CSV files
function readCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const data = [];
    createReadStream(filePath)
      .pipe(parse())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });
}

seed()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
