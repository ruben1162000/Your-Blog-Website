const blogusers = require("../models/userModel");
const blogs = require("../models/blogsModel");
module.exports.getAllUsernamesAndEmails = async (req, res) => {
    try {
        const data = await blogusers.find({}, 'username', 'email');
        res.json({ data });
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
};

module.exports.getAllBlogs = async (req, res) => {
    try {
        const data = await blogs.find({ posted: true }, '-posted -body -__v').populate('authorId', 'username -_id');
        res.json(data);
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
};

module.exports.getBlog = async (req, res) => {
    try {
        const { blogid } = req.params;
        blogObj = await blogs.findOne({ _id: blogid }, '-posted -__v').populate('authorId', 'username -_id');
        res.json(blogObj);
    } catch (err) {
        res.status(500).json({ errMsg: err.Message });
    }

};