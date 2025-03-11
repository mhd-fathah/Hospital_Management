import { BaseController } from "./BaseController.js";
class DashboardController extends BaseController {
    constructor() {
        super();
        this.dashboard = (req, res) => {
            this.renderView(res, "index", { title: "Dashboard" });
        };
    }
}
export default new DashboardController();
