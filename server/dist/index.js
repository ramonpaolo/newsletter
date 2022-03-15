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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const NodeMailer_1 = __importDefault(require("./services/NodeMailer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 3000;
const nodeMailer = new NodeMailer_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield nodeMailer.createAccount();
    yield nodeMailer.createTransport();
}))();
app.use(express_1.default.json());
app.set("view engine", "ejs");
app.use(express_1.default.static("views/index.css"));
app.route("/").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).json({ status: "success" })
    res.render("index.ejs");
})).post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    yield nodeMailer.sendEmail(email, `Olá ${name}`, "Subscription Newsletter");
    res.status(200).json({ status: "success" });
}));
app.listen(PORT);
