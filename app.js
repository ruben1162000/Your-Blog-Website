require("dotenv").config();
const express = require("express");
const blogsRouter = require("./routes/blogsRouter");
const blogUserRouter = require("./routes/blogUSerRouter");
const generalRouter = require("./routes/generalRouter");
const imageRouter = require("./routes/imageRouter");
const app = express();
require("./databases/blogdb");

app.use("/api/blogs", blogsRouter);
app.use("/api/user", blogUserRouter);
app.use("/api/general", generalRouter);
app.use("/api/images", imageRouter);

app.listen(process.env.PORT || 5000, function () {
    console.log('YOUR BLOG SPOT RUNNING ON PORT 5000');
});
