import express from "express";
import DashboardController from "../controllers/dashboardController.js";
const router = express.Router();
router.get("/", DashboardController.dashboard);
export default router;
