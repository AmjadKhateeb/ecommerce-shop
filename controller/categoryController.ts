import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/dbConfig';
import { Category } from '../db/entities/category';

const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  // Validation
  const errors: string[] = [];
  if (!name) errors.push('Name is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const category = new Category();
  category.name = name;

  try {
    const result = await categoryRepository.save(category);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create category' });
  }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve categories' });
  }
};
