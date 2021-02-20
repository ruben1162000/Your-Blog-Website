const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogsController");
const auth = require("../middleware/auth");
const { jsonParser } = require("../middleware/bodyparser");

router.use(auth);

router.post("/create", controller.createBlog);
router.patch("/:blogid/saveBlog", jsonParser, controller.saveBlog);
router.patch("/:blogid/saveTitle", jsonParser, controller.saveTitle);
router.patch("/:blogid/saveBody", jsonParser, controller.saveBody);
router.patch("/:blogid/postBlog", controller.postBlog);
router.patch("/:blogid/unpostBlog", controller.unpostBlog);
router.get("/postedBlogs", controller.getPostedBlogs);
router.get("/pendingBlogs", controller.getPendingBlogs);
router.delete("/:blogid", controller.deleteBlog);
router.get("/:blogid", controller.getBlog);

module.exports = router;


