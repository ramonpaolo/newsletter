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
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodeMailer {
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.testAccount = yield nodemailer_1.default.createTestAccount();
            return this.testAccount;
        });
    }
    createTransport() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_SENDER,
                    pass: process.env.PASS,
                },
            });
            return this.transporter;
        });
    }
    sendEmail(to, message, assunto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let info = yield this.transporter.sendMail({
                    date: Date(),
                    encoding: "utf-8", from: "Test Ramon Paolo", to, text: message, subject: assunto
                });
                console.log(info);
                return yield info;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = NodeMailer;
