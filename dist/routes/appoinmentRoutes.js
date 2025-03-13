import express from "express";
import AppoinmentController from "../controllers/appoinmentController.js";
const router = express.Router();
router.get("/", AppoinmentController.appointmentPage);
router.post("/add", AppoinmentController.addAppointment);
export default router;
