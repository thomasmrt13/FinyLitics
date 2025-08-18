import express from "express"
const router = express.Router()

import { authController } from "../controllers/index.js"
import { validateLogin, validateRegister } from "../middlewares/validation.js";

router.post("/register",validateRegister ,authController.register);
router.post("/login", validateLogin ,authController.login);

export default router