const express = require("express");
const router = express.Router();
const controller = require("../controllers/imageController");
const upload = require("../middleware/upload");
const imgauth = require("../middleware/imgauth");
router.get("/:token/:blogid/:imgname", imgauth, controller.getImage);
router.post("/:token/:blogid", imgauth, upload, controller.uploadImage);
module.exports = router;