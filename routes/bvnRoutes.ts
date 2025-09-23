import express from "express";
import { CreateBvn } from "../controllers/bvnController";

const router = express.Router();

router.route("/").post(CreateBvn);

module.exports = router;
