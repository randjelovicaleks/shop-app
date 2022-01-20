import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL;
const connectDb = async () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('DB is successfully connected.');
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
    });
}

export default connectDb;