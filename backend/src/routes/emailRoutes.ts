import { Router } from "express";
import { send, getEmails, scoreDraft, refineDraft } from "../controllers/emailController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/send", authMiddleware, send);
router.get("/", authMiddleware, getEmails);

// staging endpoints
router.post("/score", authMiddleware, scoreDraft);
router.post("/refine", authMiddleware, refineDraft);

export default router;
