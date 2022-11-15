import express from "express";

import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";
import { createLinkSchema, updateLinkSchema } from "../schemas/link.js";
import { list, show, create, update, remove } from "../controllers/link.js";

const router = express.Router();

router.use(auth);

router.get("/", list);
router.post("/", validate(createLinkSchema), create);
router.get("/:linkId", show);
router.put("/:linkId", validate(updateLinkSchema), update);
router.delete("/:linkId", remove);

export default router;