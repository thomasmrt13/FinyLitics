import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {

    try {    
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if(!token) {
            return res.status(401).json({
                message: "Accès refusé - Token d'authentification requis"
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
                message: "Token expiré - Veuillez vous reconnecter"
            })
        }
        
        return res.status(401).json({
            message: "Token invalide - Authentification echouée"
        })
    }
}
