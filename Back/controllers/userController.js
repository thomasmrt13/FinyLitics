import pkg from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const {
  user: User,
  account: Account,
  budget: Budget,
  category: Category,
} = prisma;

export default {
  async getAllUsers(req, res) {
    try {
      const users = await User.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: `Cannot find user with id=${id}`,
          });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const user = await User.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
        },
      });
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await prisma.$transaction([
        Account.deleteMany({ where: { userId: parseInt(id) } }),
        Budget.deleteMany({ where: { userId: parseInt(id) } }),
        Category.deleteMany({ where: { userId: parseInt(id) } }),
        User.delete({ where: { id: parseInt(id) } }),
      ]);
      res.status(200).json({ message: "User was deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
