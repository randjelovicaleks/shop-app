import { validationResult } from 'express-validator';
import { findOrders, findOrder, saveOrder, editOrder, removeOrder } from '../services/order.js';

export const findAllOrders = async (req, res, next) => {
    try {
        const orders = await findOrders(req.userId);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const findOrderById = async (req, res, next) => {
    try {
        const order = await findOrder(req.params.id);
        return res.status(200).json(order); 
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
        const order = await saveOrder(req.userId, req.body);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }      
};

export const updateOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
        const order = await editOrder(req.params.id, req.body);
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        await removeOrder(req.params.id);
        res.status(200).json({ message: "Order is successfully deleted." });
    } catch (error) {
        next(error);
    }
};