import { Router } from 'express';
import { createHotline, getAllHotlines, getHotlineById } from '../controller/hotlineController';

export const hotlineRouter = Router();

// Route to create a new hotline
hotlineRouter.post('/', createHotline);

// Route to get all hotlines
hotlineRouter.get('/', getAllHotlines);

// Route to get a hotline by its ID
hotlineRouter.get('/:id', getHotlineById);
