const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_DIETS = [
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten-free",
  "lactose-free",
  "keto",
  "paleo",
  "low-fodmap",
  "kid-friendly",
];

const ALLOWED_SOURCES = ["friends", "youtube", "podcast", "ad", "others"];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please enter a valid email address"],
    },
    diet: {
      type: String,
      required: [true, "Diet preference is required"],
      enum: {
        values: ALLOWED_DIETS,
        message: "Please choose a valid diet option",
      },
    },
    dislikes: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
      required: [true, "Referral source is required"],
      enum: {
        values: ALLOWED_SOURCES,
        message: "Please choose a valid referral source",
      },
    },
    weeklyPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

function parseDislikes(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
}

const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.ALLOWED_DIETS = ALLOWED_DIETS;
module.exports.ALLOWED_SOURCES = ALLOWED_SOURCES;
module.exports.parseDislikes = parseDislikes;
module.exports.isValidEmail = isValidEmail;
module.exports.EMAIL_REGEX = EMAIL_REGEX;
