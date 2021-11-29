import Order from '../models/order.js';
import error from '../models/error.js';
import Product from '../models/product.js';
import { validationResult } from 'express-validator';

export const findAllOrders = (req, res, next) => {
    //call populate method
    Order.find(req.userId)
        .then(orders => {
            res.status(200).json(orders);
        });
};

export const findOrderById = (req, res, next) => {
    //call populate method
    Order.findById(req.params.id)
        .then(order => {
            if (!order) {
                error(404, 'Order is not found');
            }
            return res.status(200).json(order); 
        })
        .catch(error => {
            next(error);
        });
};

export const createOrder = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    let order = new Order();
    order.userId = req.userId;
    order.products = req.body.products;
    let totalPrice;
    order.products.forEach(x => {
        Product.findById(x.productId)
            .then(product => {
                totalPrice += product.price * x.quantity;
            })
            .catch(error => {
                next(error);
            });
    });

    Order.create({ userId: userId, products: products, totalPrice: totalPrice })
        .then(order => {
            res.status(201).json(order);
        })
        .catch(error => {
            next(error);
        });
};

export const updateOrder = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    const products = req.body.products;
    let totalPrice;
    products.forEach(x => {
        Product.findById(x.productId)
            .then(product => {
                totalPrice += product.price * x.quantity;
            })
            .catch(error => {
                next(error);
            });
    });

    Order.findByIdAndUpdate(req.params.id, { products: products, totalPrice: totalPrice }, { new: true, rawResult: true})
        .then(order => {
            if (!order.lastErrorObject.updatedExisting && !order.value) {
                error(404, 'Order is not found');
            }
            res.status(200).json(order.value);
        })
        .catch(error => {
            next(error);
        });
};