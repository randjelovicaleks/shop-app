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
    body('email').notEmpty().isEmail().normalizeEmail().custom((value) => {
        User.find({ email: value })
            .then(user => {
                if (user.value)
                    throw new Error(`User with this email:${value} already exists`);
                return true;
            });
      }),
    body('password').notEmpty()
], signUp);

router.post(`${urlPrefix}/sign-in`, [
    body('email').notEmpty(),
    body('password').notEmpty()
], signIn);

export default router;