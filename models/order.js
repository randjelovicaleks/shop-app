import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                requred: true 
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Order', orderSchema);