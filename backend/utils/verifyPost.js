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


function generatePrompt(topic, title, description) {
  return `Analyze the topic: ${topic}, title: ${title}, description: ${description}.
  If any one of these is not related to each other or description is not informative and contains repetitive sentences, you have to return "NO", else return "YES".
  Response should be in the given schema below: 
  {
  analysis: 'YES'
  }
  `;

}



async function verifyPost(topic, title, description, resources) {
    try {
        const model = getGeminiModel();
        const prompt = generatePrompt(topic, title, description);
        console.log(prompt);
        const result = await model.generateContent(prompt);
        const parsedResult = JSON.parse(result.response.text());
        return parsedResult;
      } catch (error) {
        console.error("Error during analyzing the Content:", error);
        throw error;
      }
}

export {verifyPost}