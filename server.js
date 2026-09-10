const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/user");
const aiRoutes = require("./routes/airoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

function isDbReady() {
  return mongoose.connection.readyState === 1;
}

if (!process.env.MONGO_URL) {
  console.warn(
    "⚠️  MONGO_URL is missing. The server will still start, but signup will not save until you add it to .env."
  );
} else {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("BlossomFoods database connected"))
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      console.warn("⚠️  Server will keep running. Fix MONGO_URL and restart to save signups.");
    });
}

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "⚠️  OPENAI_API_KEY is missing. The server will still start, but meal plans will not generate until you add it to .env."
  );
}

function validationMessage(err) {
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
  }

  if (err.code === 11000) {
    return "This email is already signed up. Try a different email, or check your inbox.";
  }

  return "";
}

app.post("/api/signup", async (req, res) => {
  try {
    if (!isDbReady()) {
      console.error("signup failed: MongoDB is not connected");
      return res.status(503).json({
        error:
          "Database is not connected yet. Add MONGO_URL to your .env file and restart the server.",
      });
    }

    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const diet = String(req.body.diet || "").trim();
    const source = String(req.body.source || "").trim();
    const dislikes = User.parseDislikes(req.body.dislikes);

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ error: "Please enter your full name." });
    }

    if (!User.isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (!User.ALLOWED_DIETS.includes(diet)) {
      return res.status(400).json({ error: "Please choose a diet from the list." });
    }

    if (!User.ALLOWED_SOURCES.includes(source)) {
      return res.status(400).json({ error: "Please tell us where you heard about us." });
    }

    const user = await User.create({
      name: fullName,
      email,
      diet,
      source,
      dislikes,
    });

    console.log(`New signup saved: ${user.email} (${user._id})`);

    return res.status(201).json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    console.error("signup error:", err);

    const message = validationMessage(err);
    if (message) {
      const status = err.code === 11000 ? 409 : 400;
      return res.status(status).json({ error: message });
    }

    return res.status(500).json({
      error: "We could not save your signup. Please try again.",
    });
  }
});

app.use("/api", aiRoutes);

app.listen(PORT, () => {
  console.log(`BlossomFoods server is running on http://localhost:${PORT}`);
});
