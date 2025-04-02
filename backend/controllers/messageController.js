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
      contents: `Generate a SHORT LinkedIn outreach message (3-4 sentences max) using this template:
      
      "Hi ${name},
      
      I noticed you're a ${jobTitle} at ${company} in ${location}. [Add 1 specific detail from: ${summary}].
      
      Would be great to connect and learn more about your work.
      
      Best,
      [Your Name]"
      
      Keep it professional but concise. Focus on the most relevant detail from the summary.`,
    });

    const message = response.text;

    res.json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ error: "Failed to generate message" });
  }
};