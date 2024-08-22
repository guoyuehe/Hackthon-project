require('dotenv').config(); // Load environment variables from .env file
const { getJson } = require("serpapi");

const processImage = async () => {
    const json = await getJson({
        engine: "google_lens",
        url: "https://i.imgur.com/4Ni3VT4.png",
        api_key: process.env.GOOGLE_LENS_API_KEY
    }); 
    const result = json['visual_matches'];
    const data = result.map((r) => {return {title: r.title || '', link: r.link || ''}}) 

    return data;
}

module.exports = processImage