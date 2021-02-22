require("dotenv").config();
const express = require("express");
const path = require("path");
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

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, function () {
    console.log('YOUR BLOG SPOT RUNNING ON PORT 5000');
});
