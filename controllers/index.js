const express = require('express');
const bcrypt=require('bcrypt');
const User=require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

function home (req, res, next) {
  res.render('index', { title: 'Express' });
}
function login (req, res, next) {
  let email=req.body.email;
  let password=req.body.password;
  User.findOne({"_email":email}).select('_password _salt').then((user)=>{
    if(user){
      bcrypt.hash(password, user.salt, (err, hash)=>{
    if(err){
      //login no ok
      res.status(403).json({
        message:res.__('bad.login')
      });
    }
    if(hash == user.password){
          const jwtKey=config.get("secret.key");
          //login OK
          res.status(200).json({
            message:res.__("ok.login")
          });
        }else{
          res.status(403).json({
            message:res.__('bad.login')
          });
        }
      });
    }else{
      //login not ok
      res.status(403).json({
        message:res.__('bad.login')
      });
    }
  }).catch((err)=>{
    //login no ok
    res.status(403).json({
      message:res.__('bad.login')
    });
  });
}

module.exports={
  home,login
}
