"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startListen = void 0;
const telegram_1 = require("./configuration/telegram");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parentDirectory = path_1.default.join(__dirname, '..');
const filePath = path_1.default.join(parentDirectory, 'data.json');
const chanelsIsrael = [1179641325, 1147703577, 1143765178, 1425128751, 1559299769, 1153134726, 1475338667, 1952721314,
    1446834163, 1282622805, 1430792489, 1705806397, 1430663671];
const words = [];
let count = -1;
const startListen = () => {
    telegram_1.client.addEventHandler((updates) => {
        var _a;
        if (updates.message && ((_a = updates.message.peerId) === null || _a === void 0 ? void 0 : _a.channelId) &&
            chanelsIsrael.includes(Number(updates.message.peerId.channelId))) {
            words.push(updates.message.message);
            console.log("-------------------------------");
        }
        else if (updates.message && updates.message.peerId.userId) {
            console.log(updates.message.message);
            fs_1.default.writeFileSync(filePath, JSON.stringify(words));
            console.log('Data saved successfully!');
            console.log(words);
        }
    });
};
exports.startListen = startListen;
