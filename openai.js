const fs = require('fs');
const axios = require('axios');
require('dotenv').config(); 
// OpenAI API Key
const apiKey = process.env.OPENAI_API_KEY;

// Middleware function to process the uploaded image file
const processImage = async () => {
  // Function to encode the image buffer

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const payload = {
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Can you tell me what are the parts of this electronic component, and give me a list of recommended actual part numbers (for example MPC564C). DO NOT make up if you don't know. The list should contains up to 5 items, please answer in json format only. Each part should have part_type, part_number, manufacture"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://i.imgur.com/udxy2zs.png"
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
    return response.data.choices[0];
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Export the middleware function
module.exports = processImage;