const express = require("express");

const userController = require("../controllers/authController");

const router = express.Router();

router
  .route("/signup")
  .post(userController.signUp);

// router
//   .route("/:id")
//   .get(userController.getOnePost)
//   .patch(userController.updatePost)
//   .delete(userController.deletePost);

module.exports = router;