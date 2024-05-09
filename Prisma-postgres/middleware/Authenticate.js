import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader) {
        return res.status(401).json({ status: 401, message: "UnAuthorized" });
    }
    console.log("The token is", authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({ status: 401, message: "Invalid Token" });
        req.user = user;
        next();
    });

}

export default authMiddleware;