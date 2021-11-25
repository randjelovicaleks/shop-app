import express from 'express';
import { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, searchProduct } from '../controllers/product.js';

const router = express.Router();

const urlPrefix = '/api/products';

//Retrieve all products
router.get(urlPrefix, findAllProducts);

//Retreive single product
router.get(`${urlPrefix}/:id`, findProductById);

//Create new product
router.post(urlPrefix, createProduct);

//Update product
router.put(`${urlPrefix}/:id`, updateProduct);

//Remove product
router.delete(`${urlPrefix}/:id`, deleteProduct);

//Search products by name
router.get(urlPrefix, searchProduct);

export default router;