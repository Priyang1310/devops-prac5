const express = require("express");
const axios = require("axios");
const Queue = require("bull");

const app = express();
app.use(express.json());

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
const AUTHOR_SERVICE = process.env.AUTHOR_SERVICE || "http://author-service:4001";
const commentQueue = new Queue("comments", REDIS_URL);

let articles = [];

app.post("/articles", async (req, res) => {
  const { authorId, title } = req.body;
  try {
    const author = await axios.get(`${AUTHOR_SERVICE}/authors/${authorId}`);
    const article = { id: Date.now(), title, author: author.data };
    articles.push(article);

    // async job → notify comments service
    await commentQueue.add({ articleId: article.id, authorEmail: author.data.email }).then(() => {
      console.log("Comment notification job added for article:", article.id);
    }); 

    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/articles", (req, res) => res.json(articles));

app.listen(4002, () => console.log("Article Service running on 4002"));
