require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

console.log("ENV KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("USER PROMPT:", prompt);

    if (!prompt) {
      return res.json({ result: "NO PROMPT RECEIVED" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FIXED
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      result: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("FULL GROQ ERROR:", err);
    res.status(500).json({
      result: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
