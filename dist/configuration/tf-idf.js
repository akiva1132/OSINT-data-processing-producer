"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tfidf = void 0;
const natural_1 = __importDefault(require("natural"));
const TfIdf = natural_1.default.TfIdf;
exports.tfidf = new TfIdf();
// tfidf.addDocument('this document is about node.');
// tfidf.addDocument('this document is about ruby.');
// tfidf.addDocument('this document is about ruby and node.');
// tfidf.addDocument('this document is about node. it has node examples');
// console.log('node --------------------------------');
// tfidf.tfidfs('node', function(i, measure) {
//     console.log('document #' + i + ' is ' + measure);
// });
// console.log('ruby --------------------------------');
// tfidf.tfidfs('ruby', function(i, measure) {
//     console.log('document #' + i + ' is ' + measure);
// });
// tfidf.tfidfs('node ruby', function(i, measure) {
//     console.log('document #' + i + ' is ' + measure);
// });
// tfidf.listTerms(0 /*document index*/).forEach(function(item) {
//     console.log(item.term + ': ' + item.tfidf);
// });