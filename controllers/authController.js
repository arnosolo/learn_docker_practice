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

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({username});

    if(!foundUser) {
      return res.status(404).json({
        status: "fail",
        message: "user not found"
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, foundUser.password);
    
    if(!passwordIsCorrect) {
      res.status(404).json({
        status: "fail",
        message: "incorrect username or password"
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          user: foundUser,
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