
import { GoogleGenAI, Modality } from "@google/genai";

export const generateAsset = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fullPrompt = `${prompt}, chibi anime style asset for a dress-up game, sticker, on a solid white background, no shadows.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: fullPrompt }]
        },
        config: {
            responseModalities: [Modality.IMAGE]
        }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Error generating asset with Gemini:", error);
    throw new Error("Failed to generate asset. Please try again.");
  }
};
