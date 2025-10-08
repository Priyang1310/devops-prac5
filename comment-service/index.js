const express = require("express");
const Queue = require("bull");

const app = express();
app.use(express.json());

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
const commentQueue = new Queue("comments", REDIS_URL);

let comments = [];

commentQueue.process(async (job) => {
  console.log("Processing comment notification:", job.data);
  comments.push({ articleId: job.data.articleId, msg: "Notify via email " + job.data.authorEmail });
});

app.get("/comments", (req, res) => res.json(comments));

app.listen(4003, () => console.log("Comment Service running on 4003"));
