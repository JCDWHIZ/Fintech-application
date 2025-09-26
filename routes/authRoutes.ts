import express from "express";
import { registerUser, loginUserWithpin } from "../controllers/authController";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/pin").post(loginUserWithpin);

module.exports = router;
