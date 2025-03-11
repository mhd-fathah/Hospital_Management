import { BaseController } from "./BaseController.js";
class DoctorController extends BaseController {
    constructor() {
        super();
        this.doctorPage = (req, res) => {
            this.renderView(res, "doctors", { title: "Doctors" });
        };
    }
}
export default new DoctorController();
