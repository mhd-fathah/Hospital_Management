import { BaseController } from "./BaseController.js";
class AppoinmentController extends BaseController {
    constructor() {
        super();
        this.appointmentPage = (req, res) => {
            this.renderView(res, "appoinments", { title: "Appoinments" });
        };
    }
}
export default new AppoinmentController();
