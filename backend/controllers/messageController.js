const { GoogleGenAI } = require("@google/genai");

exports.generateMessage = async (req, res) => {
  try {
    const { name, jobTitle, company, summary } = req.body;

    if (!name || !jobTitle || !company) {
      return res.status(400).json({ error: "Name, job title and company are required" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API configuration error" });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Generate a SHORT LinkedIn message (max 3 sentences) using:
    - Name: ${name}
    - Role: ${jobTitle}
    - Company: ${company}
    - Key detail: ${summary || 'no additional info'}
    
    Format:
    1. Greeting
    2. Specific reference
    3. Connection request`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const message = response.text
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();

    res.json({ message });
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: "Message generation failed" });
  }
};