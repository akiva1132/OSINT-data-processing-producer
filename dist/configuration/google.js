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
const google_search_results_nodejs_1 = __importDefault(require("google-search-results-nodejs"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const search = new google_search_results_nodejs_1.default.GoogleSearch("2465e1286e397a4fe1f495e2d42dd7734fae331b074ce38b93490e5e2e77637b");
search.json({
    tbm: "nws",
    q: "מכבי תל אביב",
    location: "Austin, TX",
    hl: "iw",
    gl: "il"
}, (result) => {
    getH1H2Content(result.news_results[0].link)
        .then(result => {
        console.log('H1 Content:', result.h1);
        console.log('H2 Content:', result.h2);
    })
        .catch(error => {
        console.error('Failed to get content:', error.message);
    });
});
function getH1H2Content(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            if (response.status === 200) {
                const $ = cheerio_1.default.load(response.data);
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
}
