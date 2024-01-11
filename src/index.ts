
import { searchGoogle } from "./google"
import "./configuration/tf-idf"
import { getDataFromTopicsApi } from "./topicsApi"
import { send } from "./producer";
import { sleep } from "telegram/Helpers";
// import "./configuration/google"







const mainFunc = async () => {
    const topics = await getDataFromTopicsApi();
    const promises = topics.map(async (topic: string[]) => {
        if ((topic)[0].length <= 1 || (topic)[1].length <= 1){
            return { [topic[0] + topic[1]]: "not result1" }
        }
        const resultString = topic.join(' ');
        if (resultString.length < 2) return null
        const dataFromsearchGoogle = await searchGoogle(resultString);
        if (dataFromsearchGoogle) return { [resultString]: dataFromsearchGoogle };
        return { [resultString]: "not result" }
    });
    const results = await Promise.all(promises);
    console.log(results);
    send(JSON.stringify(results))
}

setInterval(mainFunc, 100000);
