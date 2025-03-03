import jwt from 'jsonwebtoken';

const authenticateAdmin = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authenticateAdmin;
