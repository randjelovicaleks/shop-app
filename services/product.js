import Product from '../models/product.js';
import { customError } from '../utils/error.js';

export const findProducts = async () => { 
    return await Product.find();
};
    
export const findProduct = async (id) => {
    const product = await Product.findById(id);      
    if (!product) 
        customError(404, 'Product is not found');
    
    return product;
};

export const saveProduct = async (product) => {
    let newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price
    });

    return await Product.create(newProduct);
};

export const editProduct = async (id, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, 
        { name: product.name, description: product.description, price: product.price }, 
        { new: true, rawResult: true});

    if (!updatedProduct.lastErrorObject.updatedExisting && !updatedProduct.value) {
        customError(404, 'Product is not found');
    }

    return updatedProduct.value;
};

export const removeProduct = async (id) => {
    const product = await Product.findById(id);       
    if (!product) {
        customError(404, 'Product is not found');
    }

    await Product.deleteOne(product._id);
};

export const searchProductsByName = async (name) => {
    const condition = name ? { name: { $regex: new RegExp(name), $options: 'i'}} : {};

    return await Product.find(condition);
};


