const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const apiRouter = require("./routes/api")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Ensure database is connected before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        })
    }
})

// Support direct API path, Netlify function path, and rewritten path
app.use("/api", apiRouter)
app.use("/.netlify/functions/api", apiRouter)
app.use("/", apiRouter)

module.exports = app
