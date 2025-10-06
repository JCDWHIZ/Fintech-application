import express from "express";
// import { transferMoney } from "../controllers/transferController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// router.route("/").post(authMiddleware, transferMoney);

module.exports = router;
