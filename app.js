const express = require("express");
const cors = require("cors");
const tutorialRoute = require("./app/routes/tutorial.routes");
const dbConnect = require("./app/config/dbConnect");

const app = express();

dbConnect();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tutorials", tutorialRoute);

app.get("/", (req, res) => {
  res.json({ message: "Information Warrior welcomes you." });
});

module.exports = app;
