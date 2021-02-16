const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./routes/blogsRouter");
const blogUserRouter = require("./routes/blogUSerRouter");
const generalRouter = require("./routes/generalRouter");
mongoose.connect('mongodb://localhost:27017/yourblogspotdb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("connected");
    })
    .catch((err => { console.log(err) }));

const app = express();

app.use("/api/blogs", blogsRouter);
app.use("/api/user", blogUserRouter);
app.use("/api/general", generalRouter);
app.listen(process.env.PORT || 5000, function () {
    console.log('YOUR BLOG SPOT RUNNING ON PORT 5000');
});



// app.use(upload(/*{limits:{fileSize:1*1024*1024}}*/));
// app.post('/testupload', function (req, res) {
//     let image = req.files.uploadimg;
//     // let name = req.body.name;
//     // let mimetype = image.mimetype;
//     // let buff = image.data;
//     // base64sent = buff.toString('base64');
//     // let image_url = 'data:' + mimetype + ';base64,' + buff.toString('base64');
//     // console.log(mimetype);
//     // console.log(image.truncated);
//     // console.log(image.size);
//     // campgrounds.push({ name: name, image: image_url });
//     // res.redirect('/campgrounds');
//     console.log(image.name);
//     console.log(image.mimetype);
//     console.log(image.data);
//     console.log(image.size);
// });