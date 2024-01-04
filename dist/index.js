"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aa_1 = require("./aa");
const telegram_1 = require("./configuration /telegram");
require("./tf-idf");
(0, telegram_1.connectToTelegram)();
(0, aa_1.startListen)();
