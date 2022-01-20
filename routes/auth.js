import express from 'express';
import { signUp, signIn } from '../controllers/auth.js';
import { body } from 'express-validator';

const router = express.Router();

const urlPrefix = '/api/v1';

router.post(`${urlPrefix}/sign-up`, [
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('address').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty()
], signUp);

router.post(`${urlPrefix}/sign-in`, [
    body('email').notEmpty(),
    body('password').notEmpty()
], signIn);

export default router;