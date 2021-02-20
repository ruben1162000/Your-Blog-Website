const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogUserController");
const { jsonParser } = require("../middleware/bodyparser");

router.post("/", controller.getUser);
router.post("/signup", jsonParser, controller.signupUser);
router.post("/login", jsonParser, controller.loginUser);
router.delete("/delete", controller.deleteUser);

module.exports = router;