const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blogUser = require("../models/userModel");
const blogs = require("../models/blogsModel");
const fs = require("fs");

module.exports.signupUser = async (req, res) => {
    const isValidEmail = email => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    const emailAlreadyexists = async email => {
        if (await blogUser.findOne({ email: email }))
            return true;
        return false;
    }


    const unameAlreadyExists = async uname => {
        if (await blogUser.findOne({ username: uname }))
            return true;
        return false;
    }

    const notValidPassword = pass => {
        errMsg = "";
        if (/\s/.test(pass)) errMsg += "No space, ";
        if (!/[A-Z]/.test(pass)) errMsg += "1 uppercase, ";
        if (!/[a-z]/.test(pass)) errMsg += "1 lowercase, ";
        if (!/\d/.test(pass)) errMsg += "1 digit, ";
        if (!/[^A-Za-z0-9\s]/.test(pass)) errMsg += "1 special, ";
        if (pass.length < 8) errMsg += "atleast 8 characters, ";

        if (errMsg)
            return errMsg.slice(0, errMsg.length - 2);
        return errMsg;
    }

    try {

        const { username, email, pass, repass } = req.body;
        /******************* VALIDATION ************/
        if (!username || !pass || !repass || !email) {
            return res.status(400).json({ name: "allErrMsg", msg: "Not all fields are filled" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ name: "emailErrMsg", msg: "enter a valid mail" });
        }

        if (emailAlreadyexists(email)) {
            return res.status(400).json({ name: "emailErrMsg", msg: "email already used" });
        }

        if (unameAlreadyExists(username)) {
            return res.status(400).json({ name: "usernameErrMsg", msg: "already taken" });
        }

        if (msg = notValidPassword(pass)) {
            return res.status(400).json({ name: "passErrMsg", msg });
        }

        if (pass !== repass) {
            return res.status(400).json({ name: "repassErrMsg", msg: "passwords donot match" });
        }

        /******************* VALIDATION ends ***************/

        /********* INSERTING INTO DATABASE ***********/
        const passHash = await bcrypt.hash(pass, 12);

        const newUser = blogUser({
            email: email,
            username: username,
            password: passHash
        });

        const savedUser = await newUser.save();
        userObj = { id: savedUser._id, username: savedUser.username, email: savedUser.email };
        fs.mkdir("./data/" + userObj.id, (err) => {
            if (err) {
                console.log(`dir for userid ${userObj.id} could not be created,ERROR: \n` + err);
                await blogUser.deleteOne(savedUser);
                res.status(500).json({ errMsg: err.message });
            } else {
                console.log(`Directory for userid ${userObj.id} created successfully!`);
                const token = jwt.sign(userObj, process.env.JWT_SECRET);
                res.json({ token, userData: userObj });
            }
        });
        /********* INSERTING INTO DATABASE ends ***********/

    } catch (error) {
        res.status(500).json({ errMsg: error.message });
    }

};

module.exports.loginUser = async (req, res) => {
    try {
        const { username, pass } = req.body;
        if (!username || !pass)
            return res.status(400).json({ allErrMsg: "Please fill out all fields" });

        const user = await blogUser.findOne({ $or: [{ username: username }, { email: username }] });

        if (!user)
            return res.status(400).json({ allErrMsg: "No such user" });

        const check = await bcrypt.compare(pass, user.password);
        if (!check)
            return res.status(400).json({ allErrMsg: "incorrect password" });
        const userObj = { id: user._id, username: user.username, email: user.email };
        const token = jwt.sign(userObj, process.env.JWT_SECRET);
        res.json({ token, userData: userObj });

    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
};

module.exports.getUser = (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.json({ valid: false });
        const verifiedObj = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedObj)
            return res.json({ valid: false });
        return res.json({ valid: true, userData: verifiedObj });

    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }

};

module.exports.deleteUser = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ valid: false });
        const verifiedObj = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedObj)
            return res.status(401).json({ valid: false });
        delUserObj = await blogUser.findOneAndDelete({ username: verifiedObj.username });
        delBlogs = await blogs.find({ authorId: verifiedObj.id });
        delVerify = await blogs.deleteMany({ authorId: verifiedObj.id });
        fs.rmdir(`./data/${authorId}`, {
            recursive: true,
        }, (err) => {
            if (err) {
                console.log(`dir for userid ${verifiedObj.id} could not be deleted,ERROR: \n` + err);
                resaveUserObj = new blogUser(delUserObj);
                await resaveUserObj.save();
                await blogs.insertMany(delBlogs);
                res.status(500).json({ errMsg: err.Message });
            } else {
                console.log(`dir for userid ${verifiedObj.id} deleted successfully`);
                res.status(204).json({ valid: true, userData: verifiedObj });
            }
        });
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }

};

