import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {

    try {    
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if(!token) {
            return res.status(401).json({
                message: "Access denied - Authentication token required"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = {
            id: decoded.userId,
        };
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired - Please log in again"
            })
        }
        
        return res.status(401).json({
            message: "Invalid token - Authentication failed"
        })
    }
}
