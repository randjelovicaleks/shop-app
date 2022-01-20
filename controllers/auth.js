import { validationResult } from 'express-validator';
import { register, login } from '../services/auth.js';

export const signUp = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        await register(req.body);
        res.status(201).json({ message: 'User is successfully created!' });
    } catch (error) {
        next(error);
    }
    
};

export const signIn = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const token = await login(req.body);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
    
};