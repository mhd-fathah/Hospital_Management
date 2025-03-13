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
import AppoinmentModel from "../models/Appoinment.js";
import PatientModel from "../models/Patient.js";
import DoctorModel from "../models/Doctor.js";
class AppoinmentController extends BaseController {
    constructor() {
        super();
        this.appointmentPage = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const selectedDate = req.query.date ? new Date(req.query.date) : new Date();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const todayAppointments = yield AppoinmentModel.getModel().find({ createdAt: { $gte: today, $lt: tomorrow } }).populate("patient doctor", "firstName lastName").sort({ time: 1 });
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            const appointments = yield AppoinmentModel.getModel().find({ date: { $gte: startOfWeek, $lte: endOfWeek } }).populate("patient doctor", "firstName lastName");
            const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
            const weekDays = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(day.getDate() + i);
                weekDays.push({
                    date: day.toISOString().split("T")[0],
                    label: day.toDateString().split(" ").slice(0, 3).join(" ")
                });
            }
            console.log("Appoinments : ", todayAppointments);
            console.log("week days : ", weekDays);
            const appoinmentType = this.getEnumValues("appoinmentType");
            const duration = this.getEnumValues("duration");
            const status = this.getEnumValues("status");
            const doctors = yield DoctorModel.findAll();
            const patients = yield PatientModel.findAll();
            this.renderView(res, "appoinments", {
                title: "Appoinments",
                appointments,
                doctors,
                patients,
                appoinmentType,
                duration,
                status,
                timeSlots,
                weekDays,
                selectedDate: startOfWeek.toISOString().split("T")[0],
                todayAppointments
            });
        }));
        this.addAppointment = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("req body : ", req.body);
            const { patient, doctor, date, time, appointmentType, notes, duration, status } = req.body;
            const appoinments = yield AppoinmentModel.create({
                patient,
                doctor,
                date,
                time,
                appoinmentType: appointmentType,
                notes,
                duration,
                status
            });
            this.sendSuccess(res, "Appoinment added successfully", appoinments);
        }));
    }
    getEnumValues(enumPath) {
        var _a, _b;
        const enumValues = (_b = (_a = AppoinmentModel["model"].schema.path(enumPath)) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.enum;
        return Array.isArray(enumValues) ? enumValues : [];
    }
}
export default new AppoinmentController();
