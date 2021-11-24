import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = Schema({
    products: [
        {
            productId: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Number, requred: true }
        }
    ]
});

export default mongoose.model('Order', orderSchema);