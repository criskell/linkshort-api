import express from "express";

import authRouter from "./auth.js";
import linkRouter from "./link.js";
import redirectRouter from "./redirect.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/links", linkRouter);
router.use("/go", redirectRouter);

export default router;