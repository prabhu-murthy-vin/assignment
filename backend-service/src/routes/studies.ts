import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = Router();

// GET all studies
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studies = await prisma.study.findMany({
      include: { program: true, milestones: true },
    });
    res.json(studies);
  } catch (error) {
    next(error);
  }
});

// GET studies by program ID
router.get('/program/:programId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studies = await prisma.study.findMany({
      where: { programId: req.params.programId },
      include: { program: true, milestones: true },
    });
    res.json(studies);
  } catch (error) {
    next(error);
  }
});

router.get('/top/program/:programId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studies = await prisma.study.findMany({
      where: { programId: req.params.programId },
      include: { program: true, milestones: true },
    });
    res.json(studies);
  } catch (error) {
    next(error);
  }
});

// GET study by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const study = await prisma.study.findUniqueOrThrow({
      where: { id: req.params.id },
      include: { program: true, milestones: true },
    });
    res.json(study);
  } catch (error) {
    next(error);
  }
});

// CREATE study
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const study = await prisma.study.create({
      data: {
        programId: req.body.programId,
        name: req.body.name,
        phase: req.body.phase,
        type: req.body.type,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        enrollmentStatus: req.body.enrollmentStatus,
        targetEnrollment: req.body.targetEnrollment,
        actualEnrollment: req.body.actualEnrollment,
        principalInvestigator: req.body.principalInvestigator,
      },
      include: { program: true, milestones: true },
    });
    res.status(201).json(study);
  } catch (error) {
    next(error);
  }
});

// UPDATE study
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const study = await prisma.study.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        phase: req.body.phase,
        type: req.body.type,
        startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
        enrollmentStatus: req.body.enrollmentStatus,
        targetEnrollment: req.body.targetEnrollment,
        actualEnrollment: req.body.actualEnrollment,
        principalInvestigator: req.body.principalInvestigator,
      },
      include: { program: true, milestones: true },
    });
    res.json(study);
  } catch (error) {
    next(error);
  }
});

// DELETE study
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.study.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
