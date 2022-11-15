import express from "express";

import { login, register } from "../controllers/auth.js";
import { loginSchema, registerSchema } from "../schemas/auth.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;