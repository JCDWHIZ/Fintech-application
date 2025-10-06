import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addBeneficiary,
  getUserbeneficiaries,
  findUserDetails,
  getUserhistory,
} from "../controllers/userController";

const router = express.Router();

router.route("/beneficiary").post(authMiddleware, addBeneficiary);
router.route("/find/:accountNumber").get(authMiddleware, findUserDetails);
router.route("/history").get(authMiddleware, getUserhistory);
router.route("/beneficiaries").get(authMiddleware, getUserbeneficiaries);

module.exports = router;
