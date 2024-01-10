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
const { Translate } = require('@google-cloud/translate').v2;
const key = "AIzaSyAhMTVj_AGimw3A05Vsfu3IS6q8WeThzpo";
console.log(Translate);
// Import the Google Cloud client library
// Create a client
const translate = new Translate();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const text = 'The text to translate, e.g. Hello, world!';
// Translate the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
const target = 'ja';
function translateText() {
    return __awaiter(this, void 0, void 0, function* () {
        let [translations] = yield translate.translate(text, 'ja');
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
            console.log(`${text[i]} => (${target}) ${translation}`);
        });
    });
}
translateText();
