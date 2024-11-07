import jwt from 'jsonwebtoken';
// Create a middleware function that blocks unauthicated users from triggering a route
export const blockGuests = (req, res, next) => {
    // TODO: Retrieve the token cookie from req.cookies
    const token = req.cookies.token;
    // TODO: If the token cookie does not exist, send a 401 json response message and return
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    // TODO: If the token exists, validate it with the verify function, ( ie. verify(token, process.env.JWT_SECRET) )
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        // TODO: If it verifies, call next to move the request on to the controller function
        return next();
    }
    catch (error) {
        console.error('Token validation failed', error);
        // TODO: If it doesn't verify send a 401 json response message and DO NOT call next
        return res.status(401).json({
            message: 'Unauthorized: Invalid token'
        });
    }
};
