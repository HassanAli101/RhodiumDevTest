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
exports.VerifyUser = exports.LoginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const logger_1 = require("../utils/logger");
const SECRET_KEY = process.env.SECRET_KEY;
const LoginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    try {
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            logger_1.logger.info("User not found with email: ", email);
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            logger_1.logger.info("Invalid Credentials of: ", email, password);
        }
        const payload = { email: user.email, LoggedIn: true };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY);
        logger_1.logger.info("User successfuly logged in: ", payload);
        return { user, token };
    }
    catch (error) {
        logger_1.ErrorLogger.error("Error in AuthService LoginUser", new Error(error));
    }
});
exports.LoginUser = LoginUser;
const VerifyUser = ({ token }) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (error) {
        logger_1.ErrorLogger.error("Error in Authservice Verify", new Error(error));
    }
};
exports.VerifyUser = VerifyUser;
//# sourceMappingURL=AuthService.js.map