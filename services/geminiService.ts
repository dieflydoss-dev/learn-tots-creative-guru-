
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment.
// Do not expose this key in a real client-side application.
// This is for demonstration purposes.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates an image using a safe, high-quality model based on a prompt.
 * @param prompt The text prompt for image generation.
 * @returns A base64-encoded data URL of the generated image.
 */
export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001', // High-quality image generation model
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The response may have been blocked for safety reasons.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to generate image: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred during image generation."));
  }
}
