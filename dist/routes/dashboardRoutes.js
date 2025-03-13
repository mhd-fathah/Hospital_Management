import express from "express";
import DashboardController from "../controllers/dashboardController.js";
const router = express.Router();
router.get("/", DashboardController.dashboard);
router.get("/countDoctors", DashboardController.getDoctorCount);
router.get("/countPatients", DashboardController.getPatientCount);
router.get("/countAppointments", DashboardController.getAppointmentsCount);
export default router;
