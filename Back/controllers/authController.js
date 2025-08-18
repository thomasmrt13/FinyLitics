import pkg, { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const {
    user: User
} = prisma;

export default {
    async register(req, res) {
        try {
            const { email, name, password } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email déjà utilisé" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                },
            });
            const { password: _, ...userWithoutPassord } = user;
            res.status(201).json(userWithoutPassord);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email: email }
            })

            if (!user) {
                return res.status(400).json({
                    message: "L'utilisateur n'existe pas"
                })
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(400).json({
                    message: "Mot de passe incorrect"
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Connexion réussie",
                token
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}