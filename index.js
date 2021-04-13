const express = require("express");
const config = require("config");

const app = express();

app.use("/", (req, res) => {
  res.status(200).send("Hello");
});

const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
