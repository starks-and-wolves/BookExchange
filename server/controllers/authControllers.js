const express=require("express");
const userModel = require('../models/userModel');
const bookModel = require('../models/book');
const messageModel = require('../models/message');
const transactionModel = require('../models/transaction');
const adminModel = require('../models/adminModel');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const JWTKEY='iamhritish';

module.exports.signup = async function SignUp(req,res){
    try{
        let dataObj=req.body;
        console.log(dataObj);
        let user = await userModel.create(dataObj);
        if(user){
            return res.json({
                    ok: true,
                    message: "user signed up",
                    data: user
                });
        }else{
            res.json({
                ok: false,
                message: "error while signing up"
            })
        }
    }catch(err){
        res.json({
            ok: false,
            message: err.message
        })
    }
}

module.exports.loginUser = async function loginUser(req,res){
    try{
        let data = req.body;
        if(data.bitsID){
            let user=await userModel.findOne({'bitsID' : data.bitsID});
            if(user){
                if(user.password==data.password){
                    let uid=user['_id'];
                    let token=jwt.sign({payload:uid},JWTKEY,)
                    res.cookie('login',token, {httpOnly: true});
                    return res.json({
                        ok: true,
                        message: "user has logged in",
                        idToken: token,
                        userDetails: data
                    });
                }else{
                    return res.json({
                        ok: false,
                        message: "credentials are wrong"
                    })
                }
            }else{
                return res.json({
                    ok:false,
                    message: "user not found"
                });
            }
        }else{
            return res.json({
                ok:false,
                message: "please enter bitsID"
            });
        }
    }catch(err){
        return res.status(500).send({
            ok: false,
            messgae: err.message
        });
    }
}

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req, res, next){
        if(roles.includes(req.role)==true){
            next();
        }else{
            res.status(401).json({
                message: "operation not allowed"
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
                token=req.cookies.login;
        }else{
                const client = req.get('User-Agent');
                if(client.includes("Mozilla")==true){
                    return res.redirect('/login');
                }else{
                    res.json({
                        message: "please login"
                    });
                }
            }
            let payload = jwt.verify(token, JWTKEY);
            if(payload){
                const user = await userModel.findById(payload.payload);
                req.role=user.role;
                req.id=user.id;
                next();
            }else{
                return res.json({
                    message: "please login again"
                });
            }
    }catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.forgotPassword = async function forgotPassword(req,res){
    let {bitsID} = req.body;
    console.log(bitsID);
    try{
        const user=await userModel.findOne({bitsID: bitsID});
        console.log(user);
        if(user){
            const resetToken = user.createResetToken();
            console.log(user);
            await user.save();
            console.log(user);
            return res.json({
                resetPasswordLink: resetToken,
            })
        }else{
            res.json({
                message: "please sign up"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.resetPassword = async function resetPassword(req,res){
    try{
        const token = req.params.token;
        console.log(token);
        let {password, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken: token});
        console.log(user);
        if(user){
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "password changed sucessfully, please login again..."
            });
        }else{
            res.json({
                message: "user not found"
            });
        }
    }catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login','',{maxAge: 1});
    res.json({
        message: "user logged out sucessfully"
    });
}