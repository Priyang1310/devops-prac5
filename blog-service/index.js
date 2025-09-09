const express = require("express");
const app = express();
const PORT = 4001;

app.get("/blogs", (req, res) => {
  res.json([
    { id: 1, title: "Intro to Microservices", author: "Priyang" },
    { id: 2, title: "Deploying on AWS", author: "Desai" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Blog Service running on port ${PORT}`);
});
