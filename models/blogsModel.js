const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogsSchema = new mongoose.Schema({
    authorId: { type: Schema.Types.ObjectId, reuired: true, ref: 'bloguser' },
    title: { type: String, reuired: true },
    body: { type: String, reuired: true },
    posted: { type: Boolean, required: true, default: false },
    lastEdit: { type: Date, required: true, default: Date.now }
});

module.exports = blogs = mongoose.model("blogs", blogsSchema);