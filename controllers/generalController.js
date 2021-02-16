const blogUser = require("../models/userModel");
const blogs = require("../models/blogsModel");
module.exports.getAllUsernamesAndEmails = async (req, res) => {
    try {
        const data = await blogUser.find({}, 'username', 'email');
        res.json({ data });
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
};

module.exports.getAllBlogs = async (req, res) => {
    try {
        const data = await blogs.find({ posted: true }, '_id authorId title lastEdit').populate('bloguser', 'username');
        res.json(data);
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
};

module.exports.getBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        blogObj = await blogs.findOne({ _id: blogid }, '-posted').populate('bloguser', 'username');
        res.json(blogObj);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};