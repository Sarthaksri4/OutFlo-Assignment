// messageController.js
const { GoogleGenAI } = require("@google/genai");

exports.generateMessage = async (req, res) => {
  try {
    const { name, jobTitle, company, location, summary } = req.body;

    if (!name || !jobTitle || !company || !location || !summary) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API Key missing" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a LinkedIn outreach message for ${name}, a ${jobTitle} at ${company}, located in ${location}. Summary: ${summary}`,
    });

    const message = response.text;

    res.json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ error: "Failed to generate message" });
  }
};
