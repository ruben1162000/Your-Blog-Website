const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
module.exports.uploadImage = async (req, res) => {
    try {
        const { blogid } = req.params;
        console.log(blogid);
        const { token, authorId } = req.userData;
        const image = req.files.uploadimg;
        fs.writeFile(`./data/${authorId}/${blogid}/images/${image.name}`, image.data, (err) => {
            if (err) throw err;
            res.json({ url: `/api/images/${token}/${blogid}/${image.name}` });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errMsg: err.Message });
    }

}
module.exports.getImage = async (req, res) => {
    try {
        const { blogid, imgname } = req.params;
        const { authorId } = req.userData;
        const imgpath = path.join(__dirname, `../data/${authorId}/${blogid}/images/${imgname}`);
        res.sendFile(imgpath);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errMsg: err.Message });
    }
}
