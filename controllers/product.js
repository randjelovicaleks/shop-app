import { findProducts, findProduct, saveProduct, editProduct, removeProduct, searchProductsByName } from '../services/product.js';
import { validationResult } from 'express-validator';

export const findAllProducts = async (req, res, next) => {
    try {
        const products = await findProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const findProductById = async (req, res, next) => {
    try {
        const product = await findProduct(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() });

    try {
        const product = await saveProduct(req.body);
        res.status(201).json(product);
    } catch(error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() });
        
    try {
        const product = await editProduct(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await removeProduct(req.params.id);
        res.status(200).json({ message: 'Product is successfully deleted.' });
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (req, res, next) => {
    try {
        const products = await searchProductsByName(req.query.name);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};