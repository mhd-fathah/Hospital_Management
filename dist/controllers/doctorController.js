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
import DoctorModel from "../models/Doctor.js";
import asyncHandler from "../utils/asyncHandler.js";
class DoctorController extends BaseController {
    constructor() {
        super();
        this.doctorPage = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = 5;
            const { data: doctors, totalPages, currentPage } = yield DoctorModel.findPaginated(page, limit);
            const departmentOptions = this.getEnumValues("department");
            const statusOptions = this.getEnumValues("status");
            this.renderView(res, "doctors", {
                title: "Doctors",
                doctors,
                departmentOptions,
                statusOptions,
                totalPages,
                currentPage
            });
        }));
        this.addDoctor = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, department, specialization, email, phoneNumber, address, qualification, joiningDate, status } = req.body;
            const profileImage = req.file ? `/uploads/${req.file.filename}` : "";
            const doctor = yield DoctorModel.create({
                firstName, lastName, department, specialization, email, phoneNumber, address, qualification, joiningDate, status, profileImage
            });
            console.log(doctor);
            this.sendSuccess(res, "Doctor added Successfully!", doctor);
        }));
        // async getAllDoctors(req: Request, res: Response){
        //     try{
        //         const doctors = await DoctorModel.findAll();
        //         this.sendSuccess(res,"Doctors fetched successfully",doctors);
        //     }catch (error){
        //         this.sendError(res,"Error fetching doctors",error);
        //     }
        // }
        this.getDoctorById = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const doctor = yield DoctorModel.findById(req.params.id);
            if (!doctor)
                return this.sendNotFound(res, "Doctor not found");
            this.sendSuccess(res, "Doctor fetched successfully", doctor);
        }));
        this.updateDoctor = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedDoctor = yield DoctorModel.updateById(req.params.id, req.body);
            if (!updatedDoctor)
                return this.sendNotFound(res, "Doctor not found!");
            this.sendSuccess(res, "Doctor updated successfully!", updatedDoctor);
        }));
        this.deleteDoctor = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const deletedDoctor = yield DoctorModel.deleteById(req.params.id);
            if (!deletedDoctor)
                return this.sendNotFound(res, "Doctor not found!");
            this.sendSuccess(res, "Doctor deleted successfully");
        }));
        this.filterDoctors = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { department } = req.query;
            let doctors;
            if (department === "All" || !department) {
                doctors = yield DoctorModel.findAll();
            }
            else {
                doctors = yield DoctorModel.find({ department });
            }
            this.sendSuccess(res, "Doctors filtered successfully", { doctors });
        }));
        this.doctorPage = this.doctorPage.bind(this);
        this.addDoctor = this.addDoctor.bind(this);
        this.getDoctorById = this.getDoctorById.bind(this);
        this.updateDoctor = this.updateDoctor.bind(this);
        this.deleteDoctor = this.deleteDoctor.bind(this);
    }
    getEnumValues(enumPath) {
        var _a, _b;
        const enumValues = (_b = (_a = DoctorModel["model"].schema.path(enumPath)) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.enum;
        return Array.isArray(enumValues) ? enumValues : [];
    }
}
export default new DoctorController();
