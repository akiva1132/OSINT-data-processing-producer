import dotenv from "dotenv";

dotenv.config();


const TOPICS_API = process.env.TOPICS_API || ""


export const getDataFromTopicsApi = async () => {
    const data = await fetch(TOPICS_API)
    .then(response => response.json())
    .then(data =>  data)
    return data
}