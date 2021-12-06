import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    let token;

    try {
        token = req.headers.authorization.split(" ")[1];
    } catch (error) {
        res.status(403).json({ message: 'Token is required for authentication'});
    }
    

    try {
        let decodedData = jwt.verify(token, 'supersecret');
        req.userId = decodedData?.userId;
        req.role = decodedData?.role;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
    
};