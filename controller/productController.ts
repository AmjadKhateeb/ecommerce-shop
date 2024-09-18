import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/dbConfig';
import { Product } from '../db/entities/product';

const productRepository: Repository<Product> = AppDataSource.getRepository(Product);

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  // Validation
  const errors: string[] = [];
  if (!name) errors.push('Name is required');
  if (price == null) errors.push('Price is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const product = new Product();
  product.name = name;
  product.price = price;

  try {
    const result = await productRepository.save(product);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create product' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve products' });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve product' });
  }
};
