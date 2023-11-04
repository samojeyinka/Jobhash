const { UnAuthenticated } = require('../errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authed = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticated('Invalid credentials');
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(payload.id).select('-password');

        req.user = { userId: payload.userId, username: payload.username, email: payload.email }
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new UnAuthenticated('Invalid credentials');
        } else {
            throw error;
        }

    }
}

module.exports = authed;