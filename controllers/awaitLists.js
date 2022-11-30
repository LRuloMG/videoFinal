const express=require("express");
const { findOneAndUpdate } = require("../models/booking");
const AwaitList=require('../models/awaitList');
const Member=require('../models/member');
const Movie=require('../models/movie');
const config = require('config');

function getAwaitLists(req, res, next) {
    AwaitList.find().then(obj=>res.status(200).json({
        message:res.__('awaitList.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('awaitList.list_f'),
        error: e
    }));
}
function getAwaitList(req, res, next) {
  const id=req.params.id;
  AwaitList.findOne({"_id":id}).then(obj=>res.status(200).json({
    message:res.__('awaitList.get_s'),
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message:res.__('awaitList.get_f'),
    error: e
  }));
}
async function create(req, res, next) {
  const memberId=req.body.memberId;
  const movieId=req.body.movieId;

  let member=await Member.findOne({"_id":memberId});
  let movie=await Movie.findOne({"_id":movieId});
  let awaitList=new AwaitList({
    member: member,
    movie: movie
  });
  awaitList.save().then(obj=>res.status(200).json({
    message:res.__('awaitList.success'),
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message:res.__('awaitList.fail'),
    obj: e
  }));
}
async function replace(req, res, next) {
    const id=req.params.id;
    const memberId=req.body.memberId ? req.body.memberId : 0;
    const movieId=req.body.movieId ? req.body.movieId : 0;
    let member=await Member.findOne({"_id":memberId});
    let movie=await Movie.findOne({"_id":movieId});
    let awaitList = new Object({
        _member: member,
        _movie: movie,
    });
    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true}).then(obj=>res.status(200).json({
        message:res.__('awaitList.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('awaitList.modify_f'),
        error: e
    }));
}
async function edit(req, res, next) {
    const id=req.params.id;
    const memberId=req.body.memberId;
    const movieId=req.body.movieId;
    let member=await Member.findOne({"_id":memberId});
    let movie=await Movie.findOne({"_id":movieId});
    let awaitList = new Object();
    if(member){
        awaitList._member=member;
    }
    if(movie){
        awaitList._movie=movie;
    }
    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true}).then(obj=>res.status(200).json({
        message:res.__('awaitList.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('awaitList.modify_f'),
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    AwaitList.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('awaitList.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('awaitList.destroy_f'),
        error: e
    }))
}
module.exports={getAwaitLists,getAwaitList,create,replace,edit,destroy};
