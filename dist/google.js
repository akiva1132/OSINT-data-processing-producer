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
exports.getH1H2Content = exports.searchGoogle = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const X_API_KEY = process.env.X_API_KEY || "";
const searchGoogle = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.stringify({ "q": query });
        const config = {
            method: 'post',
            url: 'https://google.serper.dev/news',
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = yield (0, axios_1.default)(config);
        const results = yield response.data.news[0];
        if (results === undefined)
            throw new Error("Error searching results");
        if (results.date.includes("hour") || results.date.includes("min"))
            return results;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.searchGoogle = searchGoogle;
const getH1H2Content = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(123);
        const response = yield axios_1.default.get(url);
        if (response.status === 200) {
            const $ = cheerio_1.default.load(response.data);
            // console.log($('body').text());
            const h1Content = $('h1').text();
            const h2Content = $('h2').text();
            return { h1: h1Content, h2: h2Content };
        }
        else {
            throw new Error(`Failed to retrieve content. Status code: ${response.status}`);
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.error('Error:', error.message);
        throw error;
    }
});
exports.getH1H2Content = getH1H2Content;
