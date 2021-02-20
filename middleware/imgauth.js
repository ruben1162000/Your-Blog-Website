const jwt = require("jsonwebtoken");

const imgauth = (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token)
            return res.status(401).json({ errMsg: "Authentication Token Not Available" });
        const verifiedObj = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedObj)
            return res.status(401).json({ errMsg: "Token Verification Failed" });
        const authorId = verifiedObj.id;
        req.userData = { token, authorId };
        next();
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
        console.log(err);
    }
}

module.exports = imgauth;