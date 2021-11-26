import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = Schema({
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
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Order', orderSchema);