import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = Router();

// GET all programs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programs = await prisma.program.findMany({
      include: { studies: true },
    });
    res.json(programs);
  } catch (error) {
    next(error);
  }
});


router.get('/tiles', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programs = await prisma.program.findMany({
      // include: { studies: true },
      select: {
        id: true,
        name: true,
        status: true,
        therapeuticArea: true
      }
    });
    res.json(programs);
  } catch (error) {
    next(error);
  }
});

// GET program by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await prisma.program.findUniqueOrThrow({
      where: { id: req.params.id },
      include: { studies: true },
    });
    res.json(program);
  } catch (error) {
    next(error);
  }
});

// CREATE program
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await prisma.program.create({
      data: {
        name: req.body.name,
        therapeuticArea: req.body.therapeuticArea,
        phase: req.body.phase,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        status: req.body.status,
        manager: req.body.manager,
      },
      include: { studies: true },
    });
    res.status(201).json(program);
  } catch (error) {
    next(error);
  }
});

// UPDATE program
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await prisma.program.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        therapeuticArea: req.body.therapeuticArea,
        phase: req.body.phase,
        startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
        status: req.body.status,
        manager: req.body.manager,
      },
      include: { studies: true },
    });
    res.json(program);
  } catch (error) {
    next(error);
  }
});

// DELETE program
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.program.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
