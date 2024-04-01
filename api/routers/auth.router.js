import express from "express";
import { signup, signing } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signIn", signing);

export default router;
