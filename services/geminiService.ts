
import { GoogleGenAI, Type } from "@google/genai";
import { UsageMode, AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeUsage(answers: Record<string, string>): Promise<AssessmentResult> {
  const prompt = `
    Analyze the following user answers about their AI usage:
    1. Why do you use AI?: ${answers.q1}
    2. How often?: ${answers.q2}
    3. How do you feel after?: ${answers.q3}
    4. Does it replace human contact?: ${answers.q4}
    5. Who would you message if AI wasn't available?: ${answers.q5}

    Categorize them into one of these modes:
    - Tool Mode: Functional, productivity-focused.
    - Support Mode: Using for venting or basic social friction reduction.
    - Replacement Mode: Actively choosing AI over humans.
    - Risk Mode: Emotional dependency or isolation.

    Return a JSON object following the structure:
    {
      "mode": "one of the modes above",
      "analysis": "A calm, non-judgmental 2-sentence summary of their pattern.",
      "redirects": {
        "actions": ["3 concrete human actions"],
        "template": "A message template to send to a real human",
        "microTask": "An offline 5-minute task",
        "reflection": "A prompt to think about after leaving the app"
      }
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mode: { type: Type.STRING },
          analysis: { type: Type.STRING },
          redirects: {
            type: Type.OBJECT,
            properties: {
              actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              template: { type: Type.STRING },
              microTask: { type: Type.STRING },
              reflection: { type: Type.STRING }
            },
            required: ["actions", "template", "microTask", "reflection"]
          }
        },
        required: ["mode", "analysis", "redirects"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data as AssessmentResult;
  } catch (e) {
    // Fallback if parsing fails
    return {
      mode: UsageMode.TOOL,
      analysis: "Your usage appears mostly functional and productive.",
      redirects: {
        actions: ["Set a timer for your next session", "Step outside for 5 minutes", "Drink a glass of water"],
        template: "Hey, I'm taking a break from screens, want to catch up later?",
        microTask: "Write down one thing you learned today on paper.",
        reflection: "How does my body feel after staring at the screen?"
      }
    };
  }
}
