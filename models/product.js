import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requred: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Product', productSchema);