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
exports.connectToTelegram = exports.client = void 0;
const telegram_1 = require("telegram");
const sessions_1 = require("telegram/sessions");
const input_1 = __importDefault(require("input"));
const apiId = 22806061;
const apiHash = "d0a612fdba70ee170a3d854c3c26ed52";
const stringSession = new sessions_1.StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUKpLM562fYFJ2VAubzLB3A37e6ck866cANvmLUXTXIFsXOYH4jLw3pU3TUAw+Id7NV6e3YSioK2oi68bs3zWr/xoMx+dIcYStksWFcjDcKdTZKpkQadLBf976do91OLK9SzKf7QL9UeAH+zrbWS2BeoRQNSrI1gDmbzhvW7baEKp4i1oGT433YxmnWfoxtyqKYSgQ0GXRDCfeixoLKop66KYEu47PjH9y3QufUv7II/raaE2MF9g4Cq9P0XTk0OXu5ZmnvABFibOJBmZeNsXM72a2agVhoHw6XwIxQFAWS+ltCW0xN3jmXvG5VBQUKdadPfrQLOb4t7M/IbuzPgRo0U=");
exports.client = new telegram_1.TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});
console.log("You should now be connected.");
console.log(exports.client.session.save()); // Save this string to avoid logging in again
// await client.sendMessage("me", { message: "Hello!" });
const connectToTelegram = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.client.start({
        phoneNumber: () => __awaiter(void 0, void 0, void 0, function* () { return yield input_1.default.text("Please enter your number: "); }),
        password: () => __awaiter(void 0, void 0, void 0, function* () { return yield input_1.default.text("Please enter your password: "); }),
        phoneCode: () => __awaiter(void 0, void 0, void 0, function* () { return yield input_1.default.text("Please enter the code you received: "); }),
        onError: (err) => console.log(err),
    });
});
exports.connectToTelegram = connectToTelegram;
