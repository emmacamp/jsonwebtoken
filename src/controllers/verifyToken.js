const jwt = require('jsonwebtoken');
const config = require('../config');

export function verifyToken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provide"
        })
    }

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id
    next()
}


