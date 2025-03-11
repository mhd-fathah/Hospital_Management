import express from "express";
import DoctorController from "../controllers/doctorController.js";
const router = express.Router();
router.get("/doctors", DoctorController.doctorPage);
export default router;
