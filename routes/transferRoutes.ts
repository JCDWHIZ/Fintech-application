// add middleware for tier protection and accountBalance
// add a comand in put package.json to run a ts script which should populate the admin, bvns and nins in our db
import express from "express";
import { transferMoney } from "../controllers/transferController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(authMiddleware, transferMoney);

module.exports = router;
