const blogs = require("../models/blogsModel");
const fs = require("fs");
const path = require("path");
module.exports.createBlog = async (req, res) => {
    try {
        const { id: authorId, username: author, email } = req.userData;
        const newBlog = new blogs({ authorId: authorId, title: "Untitled", body: "" });
        const savedBlog = await newBlog.save();
        const blogObj = { id: savedBlog._id, title: savedBlog.title, body: savedBlog.body };
        fs.mkdir("./data/" + authorId + "/" + savedBlog._id + "/" + "images", { recursive: true }, (err) => {
            if (err) {
                console.log(`dir for blogid ${savedBlog._id} userid ${userObj.id} could not be created,ERROR: \n` + err);
                await blogs.deleteOne(blogObj);
                res.status(500).json({ errMsg: err.Message });
            } else {
                console.log(`Directory for blogid ${savedBlog._id} userid ${userObj.id} created successfully!`);
                res.status(201).json({ blogid: blogObj._id });
            }
        });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.saveBlog = async (req, res) => {
    try {
        const { blogTitle, blogBody } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { title: blogTitle, body: blogBody, lastEdit: Date.now() });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.saveTitle = async (req, res) => {
    try {
        const { blogTitle } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { title: blogTitle, lastEdit: Date.now() });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.saveBody = async (req, res) => {
    try {
        const { blogBody } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { body: blogBody, lastEdit: Date.now() });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const deleteObj = await blogs.findOneAndDelete({ _id: blogid, authorId: authorId });
        if (deleteObj) {
            fs.rmdir(`./data/${authorId}/${blogid}`, {
                recursive: true,
            }, (err) => {
                if (err) {
                    console.log(`dir for blogid ${blogid} userid ${authorId} could not be deleted,ERROR: \n` + err);
                    resaveObj = new blogs(deleteObj);
                    await resaveObj.save();
                    res.status(500).json({ errMsg: err.Message });
                } else {
                    console.log(`dir for blogid ${blogid} userid ${authorId} deleted successfully`);
                    res.status(204).json({ validDelete: true });
                }
            });
        }

    } catch (err) {
        res.status(500).json({ errMsg: err.Message });

    }
}

module.exports.getPostedBlogs = async (req, res) => {
    try {
        const { id: authorId, username: author, email } = req.userData;
        allBlogs = await blogs.find({ authorId, posted: true }, '_id title lastEdit');
        res.json(allBlogs);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};

module.exports.getPendingBlogs = async (req, res) => {
    try {
        const { id: authorId, username: author, email } = req.userData;
        allBlogs = await blogs.find({ authorId, posted: false }, '_id title lastEdit');
        res.json(allBlogs);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};

module.exports.uploadImage = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        let image = req.files.uploadimg;
        fs.writeFile(`./data/${authorId}/${blogid}/images/${image.name}`, image.data, (err) => {
            if (err) throw err;
            res.json({ url: `http://localhost:5000/api/blogs/${blogid}/images/${image.name}` });
        });

    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

}

module.exports.getImage = async (req, res) => {
    try {
        const { blogid, imgname } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        res.sendFile(path.join(__dirname, `/data/${authorId}/${blogid}/images/${imgname}`));

    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

}

module.exports.getBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        blogObj = await blogs.findOne({ authorId, _id: blogid });
        res.json({ blogObj });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};

module.exports.postBlog = async (req, res) => {
    try {
        const { blogTitle, blogBody } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { title: blogTitle, body: blogBody, posted: true, lastEdit: Date.now() });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.unpostBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { posted: true });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}
