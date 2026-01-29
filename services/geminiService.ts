
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ArchitectQuery } from "../types";

export async function generateModpack(query: ArchitectQuery): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const userPrompt = `
    Minecraft Version: ${query.version}
    Mod Loader: ${query.loader}
    Concept: ${query.prompt}
    
    Architect, design my modpack!
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      },
    });

    return response.text || "Failed to generate modpack architecture.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The Architect encountered an error while processing your request. Please try again.");
  }
}
