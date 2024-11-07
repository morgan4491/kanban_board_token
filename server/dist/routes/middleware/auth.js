import jwt from 'jsonwebtoken';
const { verify } = jwt;
// Create a middleware function that blocks unauthicated users from triggering user ONLY routes
export const blockGuests = (req, res, next) => {
    // TODO: Retrieve the token cookie from req.cookies
    const token = req.cookies.token;
    // TODO: If the token cookie does not exist, send a 401 json response message and return
    if (!token) {
        res.status(401).json();
        return;
    }
    // TODO: If the token exists, validate it with the verify function, ( ie. verify(token, process.env.JWT_SECRET) )
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ error: 'JWT_SECRET is not defined' });
        return;
    }
    let isTokenValid;
    try {
        isTokenValid = verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
    // TODO: If it verifies, call next to move the request on to the controller function
    if (isTokenValid) {
        next();
    }
    else {
        // TODO: If it doesn't verify send a 401 json response message and DO NOT call next
        res.status(401).json();
        return;
    }
};
