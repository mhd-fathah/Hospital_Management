import mongoose, { Schema } from "mongoose";
import { BaseModel } from "./BaseModel.js";
const AppoinmentSchema = new Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    appoinmentType: { type: String, required: true, enum: ["General Checkup", "Consultation", "Follow-up", "Emergency"] },
    notes: { type: String, required: false },
    duration: { type: String, required: true, enum: ["15 min", "30 min", "45 min", "1 hour"] },
    status: { type: String, required: true, enum: ["Scheduled", "Completed", "Cancelled"] }
});
class AppointmentModel extends BaseModel {
    constructor() {
        super("Appointment", AppoinmentSchema);
    }
}
export default new AppointmentModel();
