// db.js
const mongoose = require("mongoose");

require("dotenv").config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB connected successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1); // Exit app if DB fails to connect
  }
}

module.exports = connectDB;