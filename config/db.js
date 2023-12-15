const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = mongoose;
