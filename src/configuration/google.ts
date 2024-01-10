import SerpApi from'google-search-results-nodejs'
import axios from 'axios';
import cheerio from 'cheerio';

const search = new SerpApi.GoogleSearch("2465e1286e397a4fe1f495e2d42dd7734fae331b074ce38b93490e5e2e77637b")
search.json({
tbm:"nws",
 q: "תפילין", 
 location: "Austin, TX",
 hl: "iw",
 gl: "il"
}, (result: any) => {
    console.log()
    getH1H2Content(result.news_results[0])
    .then(result => {
        console.log('H1 Content:', result.h1);
        console.log('H2 Content:', result.h2);
    })
    .catch(error => {
        console.error('Failed to get content:', error.message);
    });

})




async function getH1H2Content(url:string) {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
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


