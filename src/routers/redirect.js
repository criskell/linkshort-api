import express from "express";

import { redirect } from "../controllers/redirect.js";

const router = express.Router();

router.get("/:linkCode", redirect);

export default router;