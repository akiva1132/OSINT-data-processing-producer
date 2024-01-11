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
const google_1 = require("./google");
require("./configuration/tf-idf");
const topicsApi_1 = require("./topicsApi");
const producer_1 = require("./producer");
// import "./configuration/google"
const mainFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield (0, topicsApi_1.getDataFromTopicsApi)();
    const promises = topics.map((topic) => __awaiter(void 0, void 0, void 0, function* () {
        if ((topic)[0].length <= 1 || (topic)[1].length <= 1) {
            return { [topic[0] + topic[1]]: "not result1" };
        }
        const resultString = topic.join(' ');
        if (resultString.length < 2)
            return null;
        const dataFromsearchGoogle = yield (0, google_1.searchGoogle)(resultString);
        if (dataFromsearchGoogle)
            return { [resultString]: dataFromsearchGoogle };
        return { [resultString]: "not result" };
    }));
    const results = yield Promise.all(promises);
    console.log(results);
    (0, producer_1.send)(JSON.stringify(results));
});
setInterval(mainFunc, 100000);
