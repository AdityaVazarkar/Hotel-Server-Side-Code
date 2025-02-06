const mongoose = require("mongoose");

// MongoDB connection URL

const mongoURL = "mongodb://127.0.0.1:27017/restorenet";

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
