export const authorize = (...permittedRoles) => {
    return (req, res, next) => {
     
        if (req.userId && req.role && permittedRoles.includes(req.role)) {
            next();
        } else {
            res.status(403).json({message: "Forbidden"});
        }
    }
};