import Product from '../models/product.js';
import { error } from '../utils/error.js';
import { validationResult } from 'express-validator';

export const findAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        });
};

export const findProductById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                error(404, 'Product is not found');
            } 
            res.status(200).json(product);            
        })
        .catch(error => {
            next(error);
        });
};

export const createProduct = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() });

    let product = new Product();
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    Product.create(product)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            next(error);
        });
};

export const updateProduct = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() });
        
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    Product.findByIdAndUpdate(req.params.id, { name: name, description: description, price: price }, { new: true, rawResult: true})
        .then(product => {
            if (!product.lastErrorObject.updatedExisting && !product.value) {
                error(404, 'Product is not found');
            }
            res.status(200).json(product.value);
        })
        .catch(error => {
            next(error);
        });
};

export const deleteProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                error(404, 'Product is not found');
            }
            return Product.deleteOne(product);
        })
        .then(() => {
            res.status(200).json({ message: 'Product is successfully deleted.' })
        })
        .catch(error => {
            next(error);
        });
};

export const searchProducts = (req, res, next) => {
    const name = req.query.name;
    const condition = name ? { name: { $regex: new RegExp(name), $options: 'i'}} : {};

    Product.find(condition)
        .then(products => {
            res.status(200).json(products);
        });
};