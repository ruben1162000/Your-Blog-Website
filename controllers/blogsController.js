const blogs = require("../models/blogsModel");
const blogusers = require("../models/userModel");
const fs = require("fs");
module.exports.createBlog = async (req, res) => {
    try {
        const { id: authorId, username: author, email } = req.userData;
        const newBlog = new blogs({ authorId: authorId, title: "Untitled", body: "" });
        const savedBlog = await newBlog.save();
        const blogObj = { id: savedBlog._id, title: savedBlog.title, body: savedBlog.body };
        fs.mkdir("./data/" + authorId + "/" + savedBlog._id + "/" + "images", { recursive: true }, (err) => {
            if (err) {
                console.log(`dir for blogid ${savedBlog._id} userid ${authorId} could not be created,ERROR: \n` + err);
                blogs.deleteOne(blogObj);
                res.status(500).json({ errMsg: err.Message });
            } else {
                console.log(`Directory for blogid ${savedBlog._id} userid ${authorId} created successfully!`);
                res.status(201).json({ blogid: blogObj.id });
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
        const lastEdit = Date.now();
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { title: blogTitle, body: blogBody, lastEdit });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1, lastEdit });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.saveTitle = async (req, res) => {
    try {
        const { blogTitle } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const lastEdit = Date.now();
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { title: blogTitle, lastEdit });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1, lastEdit });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.saveBody = async (req, res) => {
    try {
        const { blogBody } = req.body;
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const lastEdit = Date.now();
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { body: blogBody, lastEdit });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1, lastEdit });
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
                    resaveObj.save();
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
        allBlogs = await blogs.find({ authorId, posted: true }, '-posted -body -__v').populate('authorId', 'username -_id');
        res.json(allBlogs);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};

module.exports.getPendingBlogs = async (req, res) => {
    try {
        const { id: authorId, username: author, email } = req.userData;
        allBlogs = await blogs.find({ authorId, posted: false }, '-posted -body -__v').populate('authorId', 'username -_id');
        res.json(allBlogs);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};


module.exports.getBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        blogObj = await blogs.findOne({ authorId, _id: blogid }, 'title body lastEdit');
        res.json(blogObj);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};

module.exports.postBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { posted: true });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}

module.exports.unpostBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        const { id: authorId, username: author, email } = req.userData;
        const updateRes = await blogs.updateOne({ _id: blogid, authorId: authorId }, { posted: false });
        res.status(200).json({ validUpdate: updateRes.n == 1 && updateRes.nModified == 1 });
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }
}
