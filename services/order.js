import Order from '../models/order.js';
import Product from '../models/product.js';
import { customError } from '../utils/error.js';

export const findOrders = async (userId) => {
    return await Order.find({ userId: userId}).populate("products");
};

export const findOrder = async (id) => {
    const order = await Order.findById(id);
    if (!order)
        customError(404, 'Order is not found');
    
    return order;
};

export const saveOrder = async (userId, order) => {
    let newOrder = new Order({
        userId: userId,
        products: order.products
    });

    const totalPrice = await calculateTotalPrice(order.products);
    return await Order.create({ userId: newOrder.userId, products: newOrder.products, totalPrice: totalPrice});   
};

export const editOrder = async (id, order) => {
    const totalPrice = await calculateTotalPrice(order.products);
    const updatedOrder = await Order.findByIdAndUpdate(id, 
        { products: order.products, totalPrice: totalPrice }, 
        { new: true, rawResult: true });

    if (!updatedOrder.lastErrorObject.updatedExisting && !updatedOrder.value)
        customError(404, 'Order is not found');
    
    return updatedOrder.value;
};

export const removeOrder = async (id) => {
    const order = await Order.findById(id);
    if (!order)
        customError("404","Order is not found");

    await Order.deleteOne(order._id);
};

const calculateTotalPrice = async (products) => {
    const allProducts = await Product.find();
    const orderedProducts = allProducts.filter(x => products.some(t => String(t._id) === String(x._id)));

    let totalPrice = 0;
    orderedProducts.forEach(x => {
        products.forEach(y => {
            if(String(x._id) === String(y._id)) 
                totalPrice += x.price * y.quantity;
        });
    });

    return totalPrice;
}
