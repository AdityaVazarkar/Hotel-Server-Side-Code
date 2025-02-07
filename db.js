const mongoose = require("mongoose");
require("dotenv").config();
// MongoDB connection URL
//const mongoURL = process.env.DB_URL_Local
const mongoURL = process.env.DB_URL;

//Set up MongoDB connection

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Server is connected to mongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error: " + err);
});

db.on("disconnect", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
