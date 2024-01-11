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
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.sendKafkaMessage = void 0;
const kafka_1 = require("./configuration/kafka");
const sendKafkaMessage = (producer, topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.send({ topic, messages: [{ value: message }] });
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.sendKafkaMessage = sendKafkaMessage;
const send = (message) => __awaiter(void 0, void 0, void 0, function* () {
    yield kafka_1.producer.connect();
    (0, exports.sendKafkaMessage)(kafka_1.producer, "news", message);
});
exports.send = send;
