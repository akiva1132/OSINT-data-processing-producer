import { text } from "stream/consumers";
import { translateToEnglish } from "./configuration/google";
import { client } from "./configuration/telegram";
import { tfidf } from "./configuration/tf-idf";
import fs from "fs"
import path from 'path';
const parentDirectory = path.join(__dirname, '..');
const filePath = path.join(parentDirectory, 'data.json');

const chanelsIsrael = [1179641325, 1147703577, 1143765178, 1425128751, 1559299769, 1153134726, 1475338667, 1952721314,
    1446834163, 1282622805, 1430792489, 1705806397, 1430663671]
const words:string[] = []


let count = -1
export const startListen = () => {
    client.addEventHandler((updates) => {
        if (updates.message && updates.message.peerId?.channelId &&
            chanelsIsrael.includes(Number(updates.message.peerId.channelId))
        ) {
            words.push(updates.message.message)
            console.log("-------------------------------");
        }
        else if (updates.message && updates.message.peerId.userId) {
            console.log(updates.message.message);
            fs.writeFileSync(filePath, JSON.stringify(words));
            console.log('Data saved successfully!');
                console.log(words);
        }
    })
}