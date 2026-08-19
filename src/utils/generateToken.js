import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const payload = { id: userId };

    // Transform it to string of letters & numbers, but when you convert back it will be an object.

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict", // stop sending cookie on cross-site requests
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return token;
}
