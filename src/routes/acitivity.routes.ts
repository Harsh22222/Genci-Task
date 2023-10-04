import express from "express";
import { verifyAccessToken } from "../middleware/auth.middleware";
import {
  createActivity,
  updateActivity,
  getDatapointsActivity,
} from "../controllers/activity.controller";
const router = express.Router();

router.get("/create", verifyAccessToken, createActivity);
router.put("/update", verifyAccessToken, updateActivity);
router.get("/get-datapoints", verifyAccessToken, getDatapointsActivity);

export default router;
