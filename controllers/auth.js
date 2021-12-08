import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { customError } from '../utils/error.js';

export const signUp = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty) {
        return res.status(400).json({ errors: validationErrors });
    }

    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName,
    user.address = req.body.address,
    user.phoneNumber = req.body.phoneNumber,
    user.email = req.body.email,
    bcrypt.hash(req.body.password, 12)
        .then(password => {
            return password;
        })
        .then(password => {
            user.password = password;
            User.create(user)
                .then(() => {
                    res.status(201).json({ message: 'User is successfully created!' });
                })
        })
        .catch(error => {
            next(error);
        });
    
};

export const signIn = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty) {
        return res.status(400).json({ errors: validationErrors });
    }

    const email = req.body.email;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                customError(404, 'User is not found');
            }
            return user;
        })
        .then(user => {
            const password = req.body.password;
            const hashPassword = user.password;
            bcrypt.compare(password, hashPassword)
                .then(isSame => {
                    if (!isSame) {
                        customError(400, 'Incorrect password');
                    }                                         
                    const token = jwt.sign({ userId: user._id, role: user.role }, 'supersecret', { expiresIn: '1h' });
                    res.status(200).json(token);                   
                })
                .catch(error => {
                    next(error);
                });
        })
        .catch(error => {
            next(error);
        });
};