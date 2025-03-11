import express from "express";
import AppoinmentController from "../controllers/appoinmentController.js";
const router = express.Router();
router.get("/appoinments", AppoinmentController.appointmentPage);
export default router;
