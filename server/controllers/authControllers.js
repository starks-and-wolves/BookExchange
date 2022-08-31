const express = require("express");
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const bookModel = require("../models/book");
const messageModel = require("../models/message");
const transactionModel = require("../models/transaction");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWTKEY = "iamhritish";
const bcrypt = require("bcrypt");

module.exports.SignUp = async function SignUp(req, res) {
  console.log(req.body);
  const {
    fullName,
    BITS_ID,
    address,
    contact,
    role,
    username,
    email,
    password,
    cpassword,
  } = req.body;
  if (
    !fullName ||
    !address ||
    !contact ||
    !role ||
    !username ||
    !email ||
    !password ||
    !cpassword
  ) {
    console.log("Please fill all the fields properly");
    return res.status(422).json({
      error: "Please fill all the fields properly",
    });
  }
  if (password != cpassword) {
    return res.status(422).json({
      error: "Password and confirm passwords have different values",
    });
  }
  var model;
  if (role === "Student User") {
    model = userModel;
  } else {
    model = adminModel;
  }
  try {
    // let dataObj=req.body;
    // console.log(dataObj);
    // if(dataObj.password === dataObj.cpassword){
    //     let user = await userModel.create(dataObj);
    //     if(user){
    //         return res.json({
    //                 ok: true,
    //                 message: "user signed up",
    //                 data: user
    //             });
    //     }else{
    //         res.json({
    //             ok: false,
    //             message: "error while signing up"
    //         })
    //     }
    // }
    // else {
    //     res.json({
    //         ok: false,
    //         message: "confirm password and password doesn't match"
    //     })
    // }
    // let user = await userModel.create(dataObj);
    //     if(user){
    //         console.log("Successful");
    //         return res.json({
    //                 ok: true,
    //                 message: "user signed up",
    //                 data: user
    //             });
    //     }else{
    //         console.log("error from try");
    //         return res.json({
    //             ok: false,
    //             message: "error while signing up"
    //         })
    //     }
    const userExist = await model.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const user = new model({
      fullName,
      BITS_ID,
      address,
      contact,
      role,
      username,
      email,
      password,
    });

    // const newUser =
    await user.save();

    res.status(201).json({ messgae: "User registered successfully" });
  } catch (err) {
    console.log("error from catch");
    console.log(err);
    return res.json({
      ok: false,
      message: err.message,
    });
  }
};

module.exports.loginUser = async function loginUser(req, res) {
  try {
    let token;
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Input email and password");
      return res.status(400).json({
        message: "Input email and password",
      });
    }
    let user = await userModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // let uid = user["_id"];
        // let token = jwt.sign({ payload: uid }, JWTKEY);
        // res.cookie("login", token, { httpOnly: true });
        // res.cookie("userid", uid, { httpOnly: true });
        // console.log("logged in successfully");
        // return res.json({
        //   ok: true,
        //   message: "user has logged in",
        //   idToken: token,
        //   userDetails: user,
        // });
        token = await user.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now + 2589200000),
          httpOnly: true,
        });

        return res.json({
          ok: true,
          message: "user has logged in",
          idToken: token,
          userDetails: user,
        });
      } else {
        console.log("Wrong credentials");
        return res.json({
          ok: false,
          message: "credentials are wrong",
        });
      }
    } else {
      console.log("user not found");
      return res.json({
        ok: false,
        message: "user not found",
      });
    }
  } catch (err) {
    console.log("in catch");
    return res.status(500).send({
      ok: false,
      messgae: err.message,
    });
  }
};

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };  
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
    } else {
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      } else {
        res.json({
          message: "please login",
        });
      }
    }
    let payload = jwt.verify(token, JWTKEY);
    if (payload) {
      const user = await userModel.findById(payload.payload);
      req.role = user.role;
      req.id = user.id;
      next();
    } else {
      return res.json({
        message: "please login again",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.forgotPassword = async function forgotPassword(req, res) {
  let { email } = req.body;
  console.log(email);
  try {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (user) {
      const resetToken = user.createResetToken();
      console.log(user);
      await user.save();
      console.log(user);
      return res.json({
        resetPasswordLink: resetToken,
      });
    } else {
      res.json({
        message: "please sign up",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    console.log(token);
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    console.log(user);
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed sucessfully, please login again...",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    message: "user logged out sucessfully",
  });
};
