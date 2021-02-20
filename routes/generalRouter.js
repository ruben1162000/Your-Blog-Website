const express = require("express");
const router = express.Router();
const controller = require("../controllers/generalController");

router.get("/allusers", controller.getAllUsernamesAndEmails);
router.get("/allblogs", controller.getAllBlogs);
router.get("/allblogs/:blogid", controller.getBlog);
module.exports = router;
