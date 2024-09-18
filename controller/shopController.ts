import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/dbConfig';
import { Shop } from '../db/entities/shop';

// Get repository
const shopRepository: Repository<Shop> = AppDataSource.getRepository(Shop);

// Create a new shop
export const createShop = async (req: Request, res: Response) => {
  const { shopName, email, password } = req.body;

  // Validation
  const errors: string[] = [];
  if (!shopName) errors.push('Shop name is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Hash the password before saving
  // Implement password hashing here (e.g., bcrypt)

  const shop = new Shop();
  shop.shopName = shopName;
  shop.email = email;
  shop.password = password; // Make sure to hash the password before saving

  try {
    const result = await shopRepository.save(shop);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create shop' });
  }
};

// Get all shops
export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await shopRepository.find();
    res.send(shops);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve shops' });
  }
};

// Get a shop by ID
export const getShopById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const shop = await shopRepository.findOne({
      where: { id },
      relations: ['products'], // Include related products if needed
    });

    if (!shop) {
      return res.status(404).send({ error: 'Shop not found' });
    }

    res.send(shop);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve shop' });
  }
};
