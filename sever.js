const express = require("express");
const cors = require("cors");
require("dotenv").config();

// routes
const authRoutes = require("./routes/authRoutes.js")

// implemented routes

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
});