import { Router } from 'express';
import { createProduct, getAllProducts, getProductById } from '../controller/productController';

export const productRouter = Router();

// Route to create a new product
productRouter.post('/', createProduct);

// Route to get all products
productRouter.get('/', getAllProducts);

// Route to get a product by its ID
productRouter.get('/:id', getProductById);
