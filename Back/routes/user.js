import express from "express";
const router = express.Router();

import { userController } from "../controllers/index.js";
import { requireAuth } from "../middlewares/auth.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);

export default router;
