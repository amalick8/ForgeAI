
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Always use process.env.API_KEY directly when initializing the GoogleGenAI instance.
export const analyzeResume = async (resumeText: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this software engineering resume text and provide feedback in JSON format. Text: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          atsScore: { type: Type.NUMBER },
          impactScore: { type: Type.NUMBER },
          keywordMatch: { type: Type.ARRAY, items: { type: Type.STRING } },
          bulletRewrites: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING },
                impact: { type: Type.STRING },
              },
            },
          },
          summary: { type: Type.STRING },
        },
      },
    },
  });
  return JSON.parse(response.text);
};

export const analyzeGitHub = async (username: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Simulate a deep analysis of a GitHub profile for user '${username}'. Provide a realistic scoring for a software engineering student looking for FAANG roles.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          qualityScore: { type: Type.NUMBER },
          consistencyScore: { type: Type.NUMBER },
          topRepoComplexity: { type: Type.STRING },
          readmeRating: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
    },
  });
  return JSON.parse(response.text);
};
