import express from 'express';
import { findAllOrders, findOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/order.js';
import { body } from 'express-validator';
import { authorize } from '../middleware/authorization.js';

const router = express.Router();

const urlPrefix = '/api/v1/orders';

//Find all orders
router.get(urlPrefix, authorize('user'), findAllOrders);

//Find order by id
router.get(`${urlPrefix}/:id`, authorize('user'), findOrderById);

//Create order
router.post(urlPrefix, [
    body('products').notEmpty()
], authorize('user'), createOrder);

//Update order
router.put(`${urlPrefix}/:id`, [
    body('products').notEmpty()
], authorize('user'), updateOrder);

//Delete order by id
router.delete(`${urlPrefix}/:id`, authorize('user'), deleteOrder);

export default router;