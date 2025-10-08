import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addBeneficiary,
  getUserbeneficiaries,
  findUserDetails,
  getUserhistory,
  findMyAccount,
  removeBeneficiary,
} from "../controllers/userController";

const router = express.Router();

router.route("/beneficiary").post(authMiddleware, addBeneficiary);
router
  .route("/beneficiary/:beneficiaryId/remove")
  .put(authMiddleware, removeBeneficiary);
router.route("/find/:accountNumber").get(authMiddleware, findUserDetails);
router.route("/").get(authMiddleware, findMyAccount);
router.route("/history").get(authMiddleware, getUserhistory);
router.route("/beneficiaries").get(authMiddleware, getUserbeneficiaries);

module.exports = router;
