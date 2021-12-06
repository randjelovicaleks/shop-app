import express from 'express';
import { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, searchProducts } from '../controllers/product.js';
import { body } from 'express-validator';
import { authorize } from '../middleware/authorization.js';

const router = express.Router();

const urlPrefix = '/api/v1/products';

//Retrieve all products
router.get(urlPrefix, authorize('user', 'admin'), findAllProducts);

//Retreive single product
router.get(`${urlPrefix}/:id`, authorize('user', 'admin'), findProductById);

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
], authorize('admin'), createProduct);

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
], authorize('admin'), updateProduct);

//Remove product
router.delete(`${urlPrefix}/:id`, authorize('admin'), deleteProduct);

//Search products by name
router.get(`${urlPrefix}/search`, authorize('user','admin'), searchProducts);

export default router;