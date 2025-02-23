const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { // Assuming user role is stored in the token
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
};

module.exports = admin; 