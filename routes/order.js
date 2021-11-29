import express from 'express';
import { findAllOrders, findOrderById, createOrder, updateOrder } from '../controllers/order.js';
import { body } from 'express-validator';

const router = express.Router();

const urlPrefix = '/api/v1/orders';

//Find all orders
router.get(urlPrefix, findAllOrders);

//Find order by id
router.get(`urlPrefix/${id}`, findOrderById);

//Create order
router.post(urlPrefix, [
    body('products').notEmpty()
], createOrder);

//Update order
router.put(`urlPrefix/${id}`, [
    body('products').notEmpty()
], updateOrder);

export default router;