const mongoose = require("mongoose");

const blogUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = blogUser = mongoose.model("blogusers", blogUserSchema);

