const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
