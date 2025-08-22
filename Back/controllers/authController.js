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
                return res.status(400).json({ message: "Email already used" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                },
            });

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const { password: _, ...userWithoutPassord } = user;
            res.status(201).json({ 
                user: userWithoutPassord,
                token: token
             });
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
                    message: "The user doesn't exist"
                })
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(400).json({
                    message: "Password incorrect"
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const { password: _, ...userWithoutPassord } = user;
            res.json({
                message: "Connected successfully",
                user: userWithoutPassord,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}