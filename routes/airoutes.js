const express = require("express");
const OpenAI = require("openai");
const mongoose = require("mongoose");
const User = require("../models/user");

const router = express.Router();

function isDbReady() {
  return mongoose.connection.readyState === 1;
}

function createOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function dietLabel(diet) {
  const labels = {
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    pescatarian: "Pescatarian",
    "gluten-free": "Gluten-free",
    "lactose-free": "Lactose-free",
    keto: "Keto",
    paleo: "Paleo",
    "low-fodmap": "Low FODMAP",
    "kid-friendly": "Kid-friendly",
  };

  return labels[diet] || diet;
}

function buildPrompt(diet, dislikes) {
  const avoided =
    dislikes.length > 0 ? dislikes.join(", ") : "none listed";

  return `You are the head chef at BlossomFoods, a Japanese-Indian fusion meal subscription in New Delhi.

Create a 7-day meal plan for one subscriber.
Diet: ${dietLabel(diet)} (${diet})
Foods and flavors to avoid: ${avoided}

Rules:
- Every dish should blend Japanese and Indian flavors (for example miso dal, tandoori salmon onigiri, coconut curry udon).
- Respect the diet strictly.
- Never include avoided foods.
- Keep each meal name + one short sentence.

Return ONLY valid JSON with this shape:
{
  "days": [
    {
      "day": "Monday",
      "breakfast": "Dish name — one sentence.",
      "lunch": "Dish name — one sentence.",
      "dinner": "Dish name — one sentence.",
      "snack": "Dish name — one sentence."
    }
  ]
}

Include all 7 days from Monday to Sunday.`;
}

function parsePlan(content) {
  try {
    const parsed = JSON.parse(content);
    if (parsed && Array.isArray(parsed.days)) {
      return parsed;
    }
  } catch (err) {
    console.error("Could not parse OpenAI JSON:", err.message);
  }

  return { raw: content };
}

router.post("/generate-plan", async (req, res) => {
  try {
    if (!isDbReady()) {
      console.error("generate-plan failed: MongoDB is not connected");
      return res.status(503).json({
        error:
          "Database is not connected yet. Add MONGO_URL to your .env file and restart the server.",
      });
    }

    const openai = createOpenAIClient();
    if (!openai) {
      console.error("generate-plan failed: OPENAI_API_KEY is missing");
      return res.status(503).json({
        error:
          "Meal plans are paused until an OpenAI API key is added to your .env file.",
      });
    }

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const dietFromBody = String(req.body.diet || "").trim();

    if (!email) {
      return res.status(400).json({ error: "Email is required to generate a plan." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "We could not find that signup. Please submit the form first.",
      });
    }

    const diet = dietFromBody || user.diet;
    const dislikes = Array.isArray(user.dislikes) ? user.dislikes : [];

    console.log(`Generating meal plan for ${email} (${diet})`);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write concise Japanese-Indian fusion meal plans. Always reply with valid JSON.",
        },
        { role: "user", content: buildPrompt(diet, dislikes) },
      ],
      max_tokens: 1200,
      temperature: 0.8,
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      console.error("OpenAI returned an empty plan");
      return res.status(502).json({
        error: "The kitchen AI returned an empty plan. Please try again.",
      });
    }

    const plan = parsePlan(content);

    user.weeklyPlan = plan;
    if (diet) {
      user.diet = diet;
    }
    await user.save();

    return res.json({
      success: true,
      plan,
      diet: user.diet,
      dislikes: user.dislikes,
    });
  } catch (err) {
    console.error("generate-plan error:", err);

    if (err.status === 401) {
      return res.status(502).json({
        error: "OpenAI rejected the API key. Check OPENAI_API_KEY in your .env file.",
      });
    }

    return res.status(500).json({
      error: "We could not generate a meal plan right now. Please try again in a moment.",
    });
  }
});

module.exports = router;
