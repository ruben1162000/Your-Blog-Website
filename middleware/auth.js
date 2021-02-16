const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.staus(401).json({ errMsg: "Authentication Token Not Available" });
        const verifiedObj = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifiedObj)
            return res.status(401).json({ errMsg: "Token Verification Failed" });
        req.userData = verifiedObj;
        next();
    } catch (err) {
        res.status(500).json({ errMsg: err.message });
    }
}

module.exports.auth = auth;