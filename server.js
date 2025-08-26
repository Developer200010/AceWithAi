const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const evaluationRoutes = require("./routes/evaluateRoutes.js");

const app = express();

// ------------------ MIDDLEWARE ------------------

// Allow JSON and cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://awacv.vercel.app"] // frontend production URL
  : ["http://localhost:5173"];   // frontend dev URL

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ------------------ ROUTES ------------------
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evaluate", evaluationRoutes);

// ------------------ SERVE FRONTEND IN PRODUCTION ------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("/*any", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
