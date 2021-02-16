const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogUserController");

router.get("/", controller.getUser);
router.post("/signup", controller.signupUser);
router.post("/login", controller.loginUser);
router.delete("/delete", controller.deleteUser);

module.exports = router;