import jwt from "jsonwebtoken";

import { prisma } from "../config/db.js";

// Middleware is just a function

// we will run this function before every single request (ex, in watchlist route).

// when we apply a middleware to an API endpoint, you have to tell the middleware to continue on to request.

export const authMiddleware = async (req, res, next) => {

    // here : we some checks , like user's authenticated.
    // If the user authenticated, we can tell the middleware to continue on to whatever the endpoint route handler has in their function.

    // TODO: 
    // 1) Read the token from the request.
    // 2) Check if token is valid.

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // it will be in array like this ["Bearer", "token"]:["Bearer", "ttshadghgadhagajhsadgsh"]
    } else if (req.cookies?.jwt) {
        // if for some reson, the token is not in the header, we want to check if token in the request's cookies.
        token = req.cookies.jwt;
    }

    //------------------------------------------------------------------------------------------------------------

    // validate : if the token is not found.

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }
    //------------------------------------------------------------------------------------------------------------

    // extract user id from token.

    try {
        // verify token vaild + extract the user id 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // because we set in (generateToken) the user id . we can find user and attached to request.

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        // if the user does not come back.
        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }

        req.user = user;

        // next : Its a function , when we call it , tells middleware to move forward with the request.
        next()
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, token failed." });
    }

    // We will require that person do request to send JWT through headers.

    // Why not send it through body? because request headers is design for authentication data, while body designed for content of the request. 




} 
