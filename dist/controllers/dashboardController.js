var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseController } from "./BaseController.js";
import asyncHandler from "../utils/asyncHandler.js";
import DoctorModel from "../models/Doctor.js";
import PatientModel from "../models/Patient.js";
import AppoinmentModel from "../models/Appoinment.js";
class DashboardController extends BaseController {
    constructor() {
        super();
        this.dashboard = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const upcomingAppointments = yield AppoinmentModel.getModel()
                .find({ date: { $gte: today } })
                .populate("patient doctor", "firstName lastName")
                .sort({ date: 1, time: 1 });
            const topDoctors = yield AppoinmentModel.getModel().aggregate([
                { $group: { _id: "$doctor", todayAppointments: { $sum: 1 } } },
                { $sort: { totalAppointments: -1 } },
                { $limit: 5 },
            ]);
            const doctorIds = topDoctors.map((doc) => doc._id);
            const doctors = yield DoctorModel.getModel()
                .find({ _id: { $in: doctorIds } })
                .select("firstName lastName specialization");
            console.log(topDoctors);
            const formattedDoctors = topDoctors.map((doc) => {
                const doctor = doctors.find((d) => String(d._id) === String(doc._id));
                return {
                    firstName: (doctor === null || doctor === void 0 ? void 0 : doctor.firstName) || "Unknown",
                    lastName: (doctor === null || doctor === void 0 ? void 0 : doctor.lastName) || "",
                    specialization: (doctor === null || doctor === void 0 ? void 0 : doctor.specialization) || "Unknown",
                    appointmentCount: doc.totalAppointments,
                };
            });
            // console.log("Top Doctors:", formattedDoctors);
            // console.log("Upcoming Appointments : ", upcomingAppointments);
            this.renderView(res, "index", {
                title: "Dashboard",
                upcomingAppointments,
                topDoctors: formattedDoctors,
            });
        }));
        this.getDoctorCount = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = yield DoctorModel.countDocuments();
            res.json({ count });
        }));
        this.getPatientCount = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = yield PatientModel.countDocuments();
            res.json({ count });
        }));
        this.getAppointmentsCount = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = yield AppoinmentModel.countDocuments();
            res.json({ count });
        }));
    }
}
export default new DashboardController();
