const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors");
require("dotenv").config();

// routes
const authRoutes = require("./routes/authRoutes.js")
const questionRoutes = require("./routes/questionRoutes");
const evaluationRoutes = require("./routes/evaluateRoutes.js")

// implemented routes

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evaluate", evaluationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
});