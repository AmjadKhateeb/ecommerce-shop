import { Router } from 'express';
import { createCategory, getAllCategories } from '../controller/categoryController';

export const categoryRouter = Router();

// Route to create a new category
categoryRouter.post('/', createCategory);

// Route to get all categories
categoryRouter.get('/', getAllCategories);
