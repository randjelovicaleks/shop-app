import express from 'express';
import { signUp, signIn } from '../controllers/auth.js';
import { body } from 'express-validator';
import User from '../models/user.js';

const router = express.Router();

const urlPrefix = '/api/v1';

router.post(`${urlPrefix}/sign-up`, [
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('address').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('email').notEmpty().isEmail().normalizeEmail().custom(async (value) => {
        const existingUser = User.exists({ email: value });
        if (existingUser)
        throw new Error(`User with this email:${value} already exists`);
      }),
    body('password').notEmpty()
], signUp);

router.post(`${urlPrefix}/sign-in`, [
    body('email').notEmpty(),
    body('password').notEmpty()
], signIn);

export default router;