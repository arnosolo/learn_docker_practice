const User = require("../models/userModel");

const bcrypt = require("bcryptjs")

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    })

    if(newUser) {
      req.session.user = newUser;
      res.status(200).json({
        status: "success",
        data: {
          user: { _id:newUser._id, username:newUser.username},
        },
      });
    }

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({
        status: "fail",
        message: "user not found"
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, foundUser.password);

    if (!passwordIsCorrect) {
      res.status(404).json({
        status: "fail",
        message: "incorrect username or password"
      });
    } else {
      req.session.user = foundUser;
      res.status(200).json({
        status: "success",
        data: {
          user: { _id:foundUser._id, username:foundUser.username},
          // user: foundUser,
        },
      });
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
}