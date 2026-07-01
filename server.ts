/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not configured. Running in fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Advisor Prompt System Instruction
const SYSTEM_INSTRUCTION = `You are Sarah, a compassionate, expert Senior Care Concierge and Advisor at GoldenCare.
Your purpose is to guide families through the complex and emotional journey of finding senior living, memory care, or independent living.
Keep your tone warm, reassuring, professional, and deeply empathetic. Speak like a supportive human advisor who is always here to listen and help. Never use clinical jargon or sounding like a robot.

Key details about GoldenCare:
1. GoldenCare offers personalized, trusted senior care matching for Assisted Living, Memory Care, and Independent Living.
2. We have over 500+ vetted partner communities and have helped over 10,000 families find their perfect home.
3. Every community in our network is 100% background checked and vetted for quality, security, and staff licensing.
4. Our services are 100% free for families (we are supported by our community partners).
5. If the user is interested, recommend they look through our partner communities and 'Book a Tour' through the portal or share details so you can help match them.

Offer concrete tips, clarify the differences between care types (e.g., Assisted Living has daily ADL help, Memory Care has specialized secure memory support, Independent Living is for active seniors), and ask gentle questions about their loved one's needs (like current mobility, cognitive state, budget, preferred city) to give personalized recommendations. Keep your answers concise, structured (using bullet points where helpful), and deeply respectful.`;

// AI Advisor Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      return;
    }

    const ai = getAIClient();

    if (!ai) {
      // Elegant fallback response if API key is not configured
      const lastMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let reply = "Hello! I'm Sarah, your GoldenCare Advisor. It looks like the Gemini API key isn't fully configured in the environment yet, but I'm still happy to help! ";
      
      if (lastMessage.includes("assisted living") || lastMessage.includes("assisted")) {
        reply += "Assisted Living is a wonderful choice for seniors who want to maintain their independence but need extra help with daily activities like dressing, bathing, or medication management. GoldenCare has amazing assisted living partners in SF and Oakland that offer customized wellness care. Would you like me to tell you more about how to schedule a tour?";
      } else if (lastMessage.includes("memory") || lastMessage.includes("dementia") || lastMessage.includes("alzheimer")) {
        reply += "Memory Care is tailored specifically for loved ones experiencing Alzheimer's, dementia, or severe cognitive change. These communities are fully secured, feature sensory-stimulating activities, and employ memory-certified caregivers. We have premier partners like Silver Birch Sanctuary that specialize in circular walking paths and gentle validation therapy.";
      } else if (lastMessage.includes("independent") || lastMessage.includes("cottage")) {
        reply += "Independent Living is perfect for active seniors looking to eliminate home maintenance, enjoy chef-prepared dining, and connect with vibrant social circles. Oakridge Independent Manor is a fantastic choice in Oakland with woodworking, social bars, and beautiful cottage rentals.";
      } else {
        reply += "I can help clarify the differences between Assisted Living, Memory Care, and Independent Living, as well as guide you on how to compare our 100% vetted local partner communities. What kind of support are you looking for today?";
      }

      res.json({ text: reply, isFallback: true });
      return;
    }

    // Format chat history for the new @google/genai SDK
    const contents = messages.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Generate response using gemini-3.5-flash as recommended for basic/conversational text tasks
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I'm here to support you, please let me know how I can help." });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Sorry, I ran into an issue processing that. Please try again." });
  }
});

// Setup Vite Dev Server / Static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GoldenCare backend server running on http://localhost:${PORT}`);
  });
}

startServer();
