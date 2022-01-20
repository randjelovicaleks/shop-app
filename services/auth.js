import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { customError } from '../utils/error.js';

export const register = async (user) => {
    let newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email
    });

    const existingUser = await User.exists({ email: user.email });
    if (existingUser)
        customError(400, `User with this email: ${user.email} already exists`);

    const hashPass = await bcrypt.hash(user.password, 12);
    newUser.password = hashPass;

    await User.create(newUser);
};

export const login = async (loginData) => {
    const userExists = await User.findOne({ email: loginData.email });
    if (!userExists)
        customError(404, 'User is not found');
    
    const isSamePassword = await bcrypt.compare(loginData.password, userExists.password);
    if (!isSamePassword)
        customError(400, 'Password is incorrect');

    const token = jwt.sign({ userId: userExists._id, role: userExists.role }, 'supersecret', { expiresIn: '1h' });
    return token;
};