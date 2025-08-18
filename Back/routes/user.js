import express from "express";
const router = express.Router();

import { userController } from "../controllers/index.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
