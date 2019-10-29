const express = require("express");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);

server.listen(5001, () => {
    console.log('\n*** Server Running on http://localhost:5001 ***\n');
});
