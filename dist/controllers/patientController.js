import { BaseController } from "./BaseController.js";
class PatientController extends BaseController {
    constructor() {
        super();
        this.patientPage = (req, res) => {
            this.renderView(res, "patients", { title: "Patients" });
        };
    }
}
export default new PatientController();
