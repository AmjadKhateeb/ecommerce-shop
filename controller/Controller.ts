import { Request, Response } from 'express';
import { AppDataSource } from '../db/dbConfig';
import { Category } from '../db/entities/category';

 const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = new Category();
  category.name = name;

  const categoryRepository = AppDataSource.getRepository(Category);
  await categoryRepository.save(category);
  res.status(201).send(category);
};

  const getAllCategories = async (req: Request, res: Response) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();
  res.send(categories);
};

export {createCategory,getAllCategories}