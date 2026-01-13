import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.json({ result: "NO PROMPT RECEIVED" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      result: completion.choices[0].message.content
    });
  } catch (err) {
    console.error("GROQ ERROR:", err);
    res.status(500).json({ result: err.message });
  }
}
