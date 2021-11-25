import express from 'express';
import { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, searchProduct } from '../controllers/product.js';
import { body } from 'express-validator/check/index.js';

const router = express.Router();

const urlPrefix = '/api/products';

//Retrieve all products
router.get(urlPrefix, findAllProducts);

//Retreive single product
router.get(`${urlPrefix}/:id`, findProductById);

//Create new product
router.post(urlPrefix, [
    body('name').trim().notEmpty().isLength({ min: 2 }),
    body('description').notEmpty().isLength({ min: 5, max: 1000}),
    body('price').notEmpty().isFloat().custom((value) => {
        if (value < 0) {
          throw new Error('Price must be positive');
        }
        return true;
      })
], createProduct);

//Update product
router.put(`${urlPrefix}/:id`,  [
    body('name').trim().notEmpty().isLength({ min: 2 }),
    body('description').notEmpty().isLength({ min: 5, max: 1000}),
    body('price').notEmpty().isFloat().custom((value) => {
        if (value < 0) {
          throw new Error('Price must be positive');
        }
        return true;
      })
], updateProduct);

//Remove product
router.delete(`${urlPrefix}/:id`, deleteProduct);

//Search products by name
router.get(urlPrefix, searchProduct);

export default router;