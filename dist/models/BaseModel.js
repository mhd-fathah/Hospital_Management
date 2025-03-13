var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
export class BaseModel {
    constructor(modelName, schema) {
        this.model = mongoose.model(modelName, schema);
    }
    getModel() {
        return this.model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find();
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(filter);
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndUpdate(id, data, { new: true });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete(id);
        });
    }
    findPaginated() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 5) {
            const skip = (page - 1) * limit;
            const totalDocs = yield this.model.countDocuments();
            const totalPages = Math.ceil(totalDocs / limit);
            const data = yield this.model.find().skip(skip).limit(limit);
            return { data, totalPages, currentPage: page };
        });
    }
    findWithFilter(filter, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(filter, fields ? fields.replace("+", " ") : "");
        });
    }
    countDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.countDocuments();
        });
    }
}
