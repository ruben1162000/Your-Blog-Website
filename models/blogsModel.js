const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogsSchema = new mongoose.Schema({
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'blogusers' },
    title: { type: String, required: true },
    body: { type: String },
    posted: { type: Boolean, required: true, default: false },
    lastEdit: { type: Date, required: true, default: Date.now }
});

module.exports = blogs = mongoose.model("blogs", blogsSchema);