const express = require("express");
const app = express();
app.use(express.json());

let authors = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" }
];

app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });
  res.json(author);
});

app.listen(4001, () => console.log("Author Service running on 4001"));
