import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import authRoutes from './routes/auth.js';
import { auth } from './middleware/authentication.js';

import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDoc = require('./swagger.json');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));

app.use(authRoutes);

app.use(auth);

app.use(productRoutes);
app.use(orderRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true })
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