import Order from '../models/order.js';
import { customError } from '../utils/error.js';
import Product from '../models/product.js';
import { validationResult } from 'express-validator';

export const findAllOrders = (req, res, next) => {
    Order.find({ userId: req.userId}).populate("products")
        .then(orders => {
            res.status(200).json(orders);
        });
};

export const findOrderById = (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (!order) {
                customError(404, 'Order is not found');
            }
            return res.status(200).json(order); 
        })
        .catch(error => {
            next(error);
        });
};

export const createOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    let order = new Order();
    order.userId = req.userId;
    order.products = req.body.products;
    let totalPrice = 0;

    const products = await Product.find().exec();

    const orderedProducts = products.filter(x => order.products.some(t => String(t._id) === String(x._id)));

    orderedProducts.forEach(x => {
        order.products.forEach(y => {
            if(String(x._id) === String(y._id)) 
                totalPrice += x.price * y.quantity;
        });
    });
         
    Order.create({ userId: order.userId, products: order.products, totalPrice: totalPrice})
        .then(order => {
            res.status(201).json(order);
        });  
};

export const updateOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    const products = req.body.products;
    let totalPrice = 0;
   
    const allProducts = await Product.find().exec();

    const orderedProducts = allProducts.filter(x => products.some(t => String(t._id) === String(x._id)));

    orderedProducts.forEach(x => {
        products.forEach(y => {
            if(String(x._id) === String(y._id)) 
                totalPrice += x.price * y.quantity;
        });
    });

    Order.findByIdAndUpdate(req.params.id, { products: products, totalPrice: totalPrice }, { new: true, rawResult: true })
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

export const deleteOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (!order)
                customError("404","Order is not found");
            return Order.deleteOne(order);
        })
        .then(() => {
            res.status(200).json({ message: "Order is successfully deleted." });
        })
        .catch(error => {
            next(error);
        });
};