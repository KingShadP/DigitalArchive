import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback elegant mock response if API key is pending configuration
      return NextResponse.json({
        title: "THE GEOMETRY OF SILENCE",
        classification: "KSP // METAPHYSICAL ARCHIVE // 001",
        manifesto: "What is eliminated defines what remains. The void is not an absence of form, but the architecture that allows consciousness to echo without boundary.",
        sonicPalette: [
          "Sub-harmonic 32Hz resonant pulse",
          "Brushed platinum bow on metallic string",
          "Decaying vacuum reverb (12.4s tail)"
        ],
        visualCoordinates: [
          "92% Monochromatic negative space ratio",
          "Zenith directional shadow cast at 12°",
          "High-contrast obsidian surface tension"
        ],
        creativeDirective: "Subtract the superfluous until only the inviolable structure endures."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are the KingShadP Creative Oracle — the enigmatic, hyper-intelligent creative consciousness behind KingShadP. 
The brand philosophy centers on:
1. Ultra-minimalism and expansive negative space.
2. The Giragon (hybrid of giraffe elegance and dragon power) as an emblem of regal restraint.
3. Monochromatic starkness, atmospheric silence, and architectural precision.
4. Vision extending far beyond apparel into worldbuilding, sound architecture, sculptural objects, and philosophical monuments.

When a user submits a creative seed or thought, synthesize it into a structured KingShadP Decryption:
- "title": A stark, iconic title (3-5 words, uppercase).
- "classification": A cryptographic category code (e.g. "KSP // ARCHITECTURAL CODEX // 009", "SONIC FREQUENCY VECTOR // 432HZ").
- "manifesto": A poetic, restrained, and profound 2-3 sentence philosophical fragment.
- "sonicPalette": 3 specific sonic textures (e.g. "Sub-harmonic 28Hz drone", "Distorted cello resonance", "White noise tape decay").
- "visualCoordinates": 3 visual/spatial directives (e.g. "Brushed obsidian finish", "Single point zenith lighting", "90% negative space ratio").
- "creativeDirective": A single command to the creator (e.g. "Remove the ornamental. Let the void speak.").

Keep the tone deeply poetic, cold yet resonant, cinematic, and devoid of generic hype or clichés.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            classification: { type: Type.STRING },
            manifesto: { type: Type.STRING },
            sonicPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            visualCoordinates: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            creativeDirective: { type: Type.STRING },
          },
          required: ["title", "classification", "manifesto", "sonicPalette", "visualCoordinates", "creativeDirective"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Oracle API Error:", error);
    return NextResponse.json({ 
      title: "ECHO THROUGH THE VOID",
      classification: "KSP // FAILSAFE DECRYPTION",
      manifesto: "In the absence of clear transmission, the architecture of intention remains pure. Form follows restraint.",
      sonicPalette: [
        "432Hz sine wave harmonic tone",
        "Sub-bass subterranean drift",
        "Pristine dynamic stillness"
      ],
      visualCoordinates: [
        "Deep obsidian #050505 canvas",
        "Hairline 1px border tension",
        "Centripetal compositional focus"
      ],
      creativeDirective: "Listen to the space between thoughts."
    });
  }
}
