import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

const API_KEY = process.env.GEMINI_API_KEY || "API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

function getGeminiModel() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json", 
    },
  });
}


function generatePrompt(topic, title) {
  return `Analyze the topic: ${topic} and title: ${title}.
  You have to create response in this given schema so that i access the response in my frontend as a json response.
  Description should contain atleast 150 words. You can enhance the title and add more topics in topic key as per the description.
  
  GIVEN SCHEMA: 
  topic: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resources: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
        
    Please ensure your response is in JSON format as per the specified schema. NOTE: all fields are compulsory and If you don't provide a value it will break the app    `;

}



async function AIContent(topic, title ) {
    try {
      const model = getGeminiModel();
      const prompt = generatePrompt(topic, title);
      console.log(prompt);
      const result = await model.generateContent(prompt);
      const parsedResult = JSON.parse(result.response.text());
      return parsedResult;
    } catch (error) {
      console.error("Error during creation of Content:", error);
      throw error;
    }
  }


export {AIContent}