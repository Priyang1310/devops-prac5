const express = require("express");
const app = express();
const PORT = 4002;

app.get("/comments", (req, res) => {
  res.json([
    { id: 1, blogId: 1, text: "Very helpful!" },
    { id: 2, blogId: 2, text: "Nice explanation" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Comment Service running on port ${PORT}`);
});
