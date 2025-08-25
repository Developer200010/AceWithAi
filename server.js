const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser")
const app = express();
const path = require("path")

const authRoutes = require("./routes/authRoutes.js")
const questionRoutes = require("./routes/questionRoutes");
const evaluationRoutes = require("./routes/evaluateRoutes.js")
// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evaluate", evaluationRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:4000",
      credentials: true,
    })
  );
  // Serve frontend
  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("/*any", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"));
  });
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}

app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
});