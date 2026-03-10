import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = Router();

// GET all milestones
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestones = await prisma.milestone.findMany({
      include: { study: true },
    });
    res.json(milestones);
  } catch (error) {
    next(error);
  }
});

// GET milestones by study ID
router.get('/study/:studyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestones = await prisma.milestone.findMany({
      where: { studyId: req.params.studyId },
      include: { study: true },
    });
    res.json(milestones);
  } catch (error) {
    next(error);
  }
});

// GET milestone by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestone = await prisma.milestone.findUniqueOrThrow({
      where: { id: req.params.id },
      include: { study: true },
    });
    res.json(milestone);
  } catch (error) {
    next(error);
  }
});

// CREATE milestone
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestone = await prisma.milestone.create({
      data: {
        studyId: req.body.studyId,
        name: req.body.name,
        plannedDate: new Date(req.body.plannedDate),
        actualDate: req.body.actualDate ? new Date(req.body.actualDate) : null,
        status: req.body.status,
      },
      include: { study: true },
    });
    res.status(201).json(milestone);
  } catch (error) {
    next(error);
  }
});

// UPDATE milestone
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestone = await prisma.milestone.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        plannedDate: req.body.plannedDate ? new Date(req.body.plannedDate) : undefined,
        actualDate: req.body.actualDate ? new Date(req.body.actualDate) : undefined,
        status: req.body.status,
      },
      include: { study: true },
    });
    res.json(milestone);
  } catch (error) {
    next(error);
  }
});

// DELETE milestone
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.milestone.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
