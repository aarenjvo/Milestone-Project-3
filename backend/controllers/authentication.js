const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct
const router = express.Router();

router.get('/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });

        const [authenticationMethod, token] = authHeader.split(' ');
        if (authenticationMethod !== 'Bearer') return res.status(401).json({ message: 'Invalid authentication method' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
