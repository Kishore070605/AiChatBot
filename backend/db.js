const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.db_uri)
    console.log("MongoDB Connected")
  } catch (err) {
    console.log("error:", err)
  }
}

module.exports = connectDB