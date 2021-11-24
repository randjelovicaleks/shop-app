import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString, { useNewUrlParser: true })
    .then(() => {
        console.log('DB is successfully connected.');
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
    });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});