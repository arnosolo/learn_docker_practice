const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/signup")
  .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getOnePost)
//   .patch(userController.updatePost)
//   .delete(userController.deletePost);

module.exports = router;