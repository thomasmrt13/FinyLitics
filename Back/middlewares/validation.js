export const validateRegister = (req, res, next) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        })
    }

    if (name.trim().length < 2) {
        return res.status(400).json({
            message: "The name must contain at least 2 characters"
        });
    }


    if (password.length < 6) {
        return res.status(400).json({
            message: "The password must contain at least 6 characters"
        })
    }

    next();
}

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    next();
}