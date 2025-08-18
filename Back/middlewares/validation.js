export const validateRegister = (req, res, next) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            message: "Tous les champs sont requis"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Format d'email invalide"
        })
    }

    if (name.trim().length < 2) {
        return res.status(400).json({
            message: "Le nom doit contenir au moins 2 caractères"
        });
    }


    if (password.length < 6) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 6 caractères"
        })
    }

    next();
}

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "Email et mot de passe requis"
        })
    }

    next();
}