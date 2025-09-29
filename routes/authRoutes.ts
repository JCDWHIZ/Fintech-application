import express from "express";
import { registerUser, loginUserWithpin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(authMiddleware, registerUser);
router.route("/pin").post(loginUserWithpin);

module.exports = router;
