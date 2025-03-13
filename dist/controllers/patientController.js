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
import PatientModel from "../models/Patient.js";
import asyncHandler from "../utils/asyncHandler.js";
import DoctorModel from "../models/Doctor.js";
class PatientController extends BaseController {
    constructor() {
        super();
        this.patientPage = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const totalPatients = yield PatientModel.countDocuments();
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const newPatients = yield PatientModel.getModel().countDocuments({
                createdAt: {
                    $gte: new Date(currentYear, currentMonth, 1),
                    $lt: new Date(currentYear, currentMonth + 1, 1)
                }
            });
            const admittedPatients = yield PatientModel.getModel().countDocuments({ patientStatus: "Admitted" });
            const underTreatmentPatients = yield PatientModel.getModel().countDocuments({ patientStatus: "Under Treatment" });
            const page = parseInt(req.query.page) || 1;
            const limit = 5;
            const { data, totalPages, currentPage } = yield PatientModel.findPaginated(page, limit);
            const patients = yield PatientModel.getModel().populate(data, {
                path: "assignedDoctor",
                select: "firstName lastName"
            });
            const gender = this.getEnumValues("gender");
            const bloodGroups = this.getEnumValues("bloodGroup");
            const statusOptions = this.getEnumValues("patientStatus");
            const assignedDoctors = yield DoctorModel.findWithFilter({}, "firstName lastName _id");
            this.renderView(res, "patients", {
                title: "Patients",
                patients,
                gender,
                bloodGroups,
                statusOptions,
                assignedDoctors,
                totalPages,
                currentPage,
                totalPatients,
                newPatients,
                admittedPatients,
                underTreatmentPatients
            });
        }));
        this.addPatient = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, dateOfBirth, gender, bloodGroup, email, phoneNumber, address, assignedDoctor, patientStatus, initialDiagnosis, medicalHistory } = req.body;
            const patientPhoto = req.file ? `/uploads/${req.file.filename}` : "";
            const patient = yield PatientModel.create({
                firstName,
                lastName,
                dateOfBirth,
                gender,
                bloodGroup,
                email,
                phoneNumber,
                address,
                assignedDoctor,
                patientStatus,
                initialDiagnosis,
                medicalHistory,
                patientPhoto
            });
            this.sendSuccess(res, "Patient added successfully!", patient);
        }));
        this.getPatientById = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const patient = yield PatientModel.getModel().findById(req.params.id).populate("assignedDoctor", "firstName lastName specialization");
            if (!patient)
                return this.sendNotFound(res, "Patient not found");
            this.sendSuccess(res, "Patient fetched successfully", patient);
        }));
        this.updatePatient = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedPatient = yield PatientModel.updateById(req.params.id, req.body);
            if (!updatedPatient)
                return this.sendNotFound(res, "Patient not found");
            this.sendSuccess(res, "Patient updated successfully", updatedPatient);
        }));
        this.deletePatient = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const deletePatient = yield PatientModel.deleteById(req.params.id);
            if (!deletePatient)
                return this.sendNotFound(res, "Patient not found!");
            this.sendSuccess(res, "Patient deleted successfully");
        }));
        this.filterPatients = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { status } = req.query;
            let patients;
            if (status === "All" || !status) {
                patients = yield PatientModel.getModel().find().populate("assignedDoctor", "firstName lastName");
            }
            else {
                patients = yield PatientModel.getModel().find({ patientStatus: status }).populate("assignedDoctor", "firstName lastName");
            }
            this.sendSuccess(res, "Patients filtered successfully", { patients });
        }));
    }
    getEnumValues(enumPath) {
        var _a, _b;
        const enumValues = (_b = (_a = PatientModel["model"].schema.path(enumPath)) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.enum;
        return Array.isArray(enumValues) ? enumValues : [];
    }
}
export default new PatientController();
