import express from "express";
import {
  registerUser,
  loginUserWithPin,
  loginUserWithPassword,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(authMiddleware, registerUser);
router.route("/pin").post(loginUserWithPin);
router.route("/password").post(loginUserWithPassword);

module.exports = router;
