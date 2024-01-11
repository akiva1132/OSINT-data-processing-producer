import { searchGoogle } from "./google"
import { getDataFromTopicsApi } from "./topicsApi"
import { send } from "./producer";




const main = async () => {
    const topics = await getDataFromTopicsApi();
    const promises = topics.map(async (topic: string[]) => {
        if ((topic)[0].length <= 1 || (topic)[1].length <= 1){
            return { data: "not result1" , topic: topic[0] + topic[1]}
        }
        const resultString = topic.join(' ');
        if (resultString.length < 2) return null
        const dataFromsearchGoogle = await searchGoogle(resultString);
        if (dataFromsearchGoogle) return { data: dataFromsearchGoogle, topic: resultString };
        return {data:"not result", topic: resultString}
    });
    const results = await Promise.all(promises);
    console.log(results);
    send(JSON.stringify(results))
}

main()
setInterval(main, 60000);
