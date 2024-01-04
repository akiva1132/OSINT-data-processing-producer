import { client } from "./configuration /telegram";
import { tfidf } from "./tf-idf";

const chanelsIsrael = [1179641325, 1147703577, 1143765178, 1425128751, 1559299769, 1153134726, 1475338667, 1952721314,
1446834163, 1282622805, 1430792489, 1705806397, 1430663671]

const chanelsUSA = [1560386984]

export const startListen = () => {
    client.addEventHandler((updates) => {
        if (updates.message && updates.message.peerId.channelId &&
            chanelsIsrael.includes(Number(updates.message.peerId.channelId)) ||
            chanelsUSA.includes(Number(updates.message.peerId.channelId)
            )) {
            console.log(Number(updates.message.peerId.channelId));
            console.log(Number(updates.message.peerId.channelId) === 1541877469);
            console.log(updates.message.message);
            tfidf.addDocument(updates.message.message)
            console.log("-------------------------------");
        }
        else if (updates.message && updates.message.peerId.userId){
            console.log(updates.message.message);
            console.log("-------------------------------");
            tfidf.listTerms(0 /*document index*/).forEach(function(item) {
                tfidf.addDocument(updates.message.message)
                console.log(item.term + ': ' + item.tfidf);
            });
        }
    })
}