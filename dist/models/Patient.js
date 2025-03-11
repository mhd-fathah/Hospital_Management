import mongoose, { Schema } from "mongoose";
import { BaseModel } from "./BaseModel.js";
const PatientSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientStatus: { type: String, required: true, enum: ["Admitted", "Discharged", "Under Treatment"] },
    initialDiagnosis: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    patientPhoto: { type: String, required: false }
});
class PatientModel extends BaseModel {
    constructor() {
        super("Patient", PatientSchema);
    }
}
export default new PatientModel();
