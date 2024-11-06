import jwt from 'jsonwebtoken';
export const authenticateToken = async (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // Extract the token from the request cookies
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            message: 'You are not authorized to perform this action'
        });
    }
    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Add the user data to the request object
        req.user = verified;
        // This calls the next middleware handler
        return next();
    }
    catch (error) {
        console.error('Error verifying token', error);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};
