"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVehiclesFromDB = exports.AddVehicleToDB = void 0;
const VehicleModel_1 = __importDefault(require("../models/VehicleModel"));
const logger_1 = require("../utils/logger");
const AddVehicleToDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ carModel, price, phoneNumber, numPictures, pictureUrls, email, userLoggedIn, }) {
    try {
        const newVehicle = new VehicleModel_1.default({
            carModel,
            price,
            phoneNumber,
            numPictures,
            pictureUrls,
            email,
            userLoggedIn,
        });
        logger_1.logger.info("New Vehicle Info Added to DB with carModel: ", carModel);
        return yield newVehicle.save();
    }
    catch (error) {
        logger_1.ErrorLogger.error("Error in VehicleService AddVehicleToDB: ", error.message || error);
    }
});
exports.AddVehicleToDB = AddVehicleToDB;
const GetVehiclesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info("Vehicle Information requested");
        return yield VehicleModel_1.default.find();
    }
    catch (error) {
        logger_1.ErrorLogger.error("Error in VehicleService GetVehiclesFromDB: ", error.message || error);
    }
});
exports.GetVehiclesFromDB = GetVehiclesFromDB;
//# sourceMappingURL=VehicleService.js.map