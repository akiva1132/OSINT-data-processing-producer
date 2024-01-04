"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startListen = void 0;
const telegram_1 = require("./configuration /telegram");
const tf_idf_1 = require("./tf-idf");
const chanelsIsrael = [1179641325, 1147703577, 1143765178, 1425128751, 1559299769, 1153134726, 1475338667, 1952721314,
    1446834163, 1282622805, 1430792489, 1705806397, 1430663671];
const chanelsUSA = [1560386984];
const startListen = () => {
    telegram_1.client.addEventHandler((updates) => {
        if (updates.message && updates.message.peerId.channelId &&
            // chanelsIsrael.includes(Number(updates.message.peerId.channelId)) ||
            chanelsUSA.includes(Number(updates.message?.peerId.channelId))) {
            console.log(updates.message.message);
            tf_idf_1.tfidf.addDocument(updates.message.message);
            console.log("-------------------------------");
        }
        else if (updates.message && updates.message.peerId.userId) {
            console.log(updates.message.message);
            console.log("-------------------------------");
            tf_idf_1.tfidf.listTerms(0 /*document index*/).forEach(function (item) {
                tf_idf_1.tfidf.addDocument(updates.message.message);
                console.log(item.term + ': ' + item.tfidf);
            });
        }
    });
};
exports.startListen = startListen;
