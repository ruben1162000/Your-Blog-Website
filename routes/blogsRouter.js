const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogsController");
const auth = require("../middleware/auth");
const upload = require("express-fileupload")();
router.use(auth);

router.post("/create", controller.createBlog);
router.patch("/:blogid/saveBlog", controller.saveBlog);
router.patch("/:blogid/saveTitle", controller.saveTitle);
router.patch("/:blogid/saveBody", controller.saveBody);
router.patch("/:blogid/postBlog", controller.postBlog);
router.patch("/:blogid/unpostBlog", controller.unpostBlog);
router.get("/postedBlogs", controller.getPostedBlogs);
router.get("/pendingBlogs", controller.getPendingBlogs);
router.delete("/:blogid/delete", controller.deleteBlog);
router.get("/:blogid", controller.getBlog);
router.get("/:blogid/images/:imgname", controller.getImage);
router.post("/:blogid/images", upload, controller.uploadImage);

module.exports = router;


