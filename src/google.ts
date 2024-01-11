import cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import dotenv from "dotenv";

dotenv.config();


const X_API_KEY = process.env.X_API_KEY || ""

export const searchGoogle = async (query: string): Promise<any> => {
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
    const response: AxiosResponse = await axios(config);
    const results = await response.data.news[0]
    if (results === undefined) throw new Error("Error searching results")
    if (results.date.includes("hour") || results.date.includes("min")) return results
  } catch (error) {
    console.error(error);
    throw error;
  }
};







export const getH1H2Content = async(url: string) => {
    try {
        console.log(123);
        
        const response = await axios.get(url);
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            // console.log($('body').text());
            const h1Content = $('h1').text();
            const h2Content = $('h2').text();
            return { h1: h1Content, h2: h2Content };
        } else {
            throw new Error(`Failed to retrieve content. Status code: ${response.status}`);
        }
    } catch (error) {
        if (error instanceof Error) console.error('Error:', error.message);
        throw error;
    }
}


