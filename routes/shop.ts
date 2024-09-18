import { Router } from 'express';
import { createShop, getAllShops, getShopById } from '../controller/shopController';

export const shopRouter = Router();

// Route to create a new shop
shopRouter.post('/', createShop);

// Route to get all shops
shopRouter.get('/', getAllShops);

// Route to get a shop by its ID
shopRouter.get('/:id', getShopById);
