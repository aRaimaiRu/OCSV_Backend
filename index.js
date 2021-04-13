const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/Ocsv", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use("/api/v1/users/register");
app.use("/", (req, res) => {
  res.status(200).send("Hello");
});

const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
