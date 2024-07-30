const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(403).send('Please login first');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log('Successfully verified token!', decode);
    } catch (error) {
        console.log(error);
        return res.status(401).send('Invalid token');
    }
    next();
};

module.exports = auth;
