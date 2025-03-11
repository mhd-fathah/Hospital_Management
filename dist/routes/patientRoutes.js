import express from "express";
import PatientController from "../controllers/patientController.js";
const router = express.Router();
router.get("/patients", PatientController.patientPage);
export default router;
