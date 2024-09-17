const express = require("express");

const app = express();

const port = 80;

app.use((req, res) => {
  res.send("Hello Node.js");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
