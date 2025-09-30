import express from "express";
import {
  registerUser,
  loginUserWithpin,
  forgotUserPin,
  setUserPin,
} from "../controllers/authController";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/pin").post(loginUserWithpin);
router.route("/forgot-pin").post(forgotUserPin);
router.route("/set-pin").put(setUserPin);

module.exports = router;
