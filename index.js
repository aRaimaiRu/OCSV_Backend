const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const login = require("./routes/auth");
const course = require("./routes/course");
const app = express();

mongoose
  .connect("mongodb://localhost/Ocsv", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/v1/users", users); //register
app.use("/api/v1/auth", login);
app.use("/api/v1/courses", course);
app.use("/", (req, res) => {
  res.status(200).send("Hello");
});

const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
