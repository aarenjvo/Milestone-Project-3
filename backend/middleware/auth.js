const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { token } = req.cookies || {}; // Ensure req.cookies is defined

    if (!token) {
        return res.status(403).send('Please login first');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Corrected variable name
        console.log('Successfully verified token!', decoded);
    } catch (error) {
        console.log('Token verification error:', error);
        return res.status(401).send('Invalid token');
    }

    next();
};

module.exports = auth;
