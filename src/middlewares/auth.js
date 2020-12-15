const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;
const statusFailed = "FAILED";

exports.auth = async (req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        return res.status(400).json({
        status: statusFailed,
        message: "Access denied",
        });
    }

    const token = header.replace("Bearer ", "");

    try {
        const verified = jwt.verify(token, privateKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({
        status: statusFailed,
        message: "Invalid Token",
        });
    }
}