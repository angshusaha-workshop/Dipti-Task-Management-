const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require("mongoose")
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/todo"

mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Database connected successfully")
  })
  .catch((err) => {
    console.error("MongoDB connection failed. Check that MongoDB is running locally or update the MONGO_URL in backend/.env")
    console.error(err.message)
  })

const apiRouter = require("./routes/api")
app.use("/api", apiRouter)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`)
})