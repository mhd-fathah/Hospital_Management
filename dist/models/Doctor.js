import { Schema } from "mongoose";
import { BaseModel } from "./BaseModel.js";
const DoctorSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    department: { type: String, required: true, enum: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine"] },
    specialization: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    qualification: { type: String, required: true },
    joiningDate: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, enum: ["Active", "Inactive", "On Leave"] },
    profileImage: { type: String, required: true }
});
class DoctorModel extends BaseModel {
    constructor() {
        super("Doctor", DoctorSchema);
    }
}
export default new DoctorModel();
