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
import DoctorModel from "../models/Doctor.js";
class DashboardController extends BaseController {
    constructor() {
        super();
        this.dashboard = (req, res) => {
            this.renderView(res, "index", { title: "Dashboard" });
        };
        this.getDoctorCount = asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = yield DoctorModel.countDocuments();
            console.log(count);
            res.json({ count });
        }));
    }
}
export default new DashboardController();
