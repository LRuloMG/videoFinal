const express=require("express");
const { findOneAndUpdate } = require("../models/actor");
const Actor=require('../models/actor');
const config = require('config');

function getActors(req, res, next) {
    Actor.find().then(obj=>res.status(200).json({
        message:res.__('actors.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('actors.list_f'),
        error: e
    }));
}
function getActor(req, res, next) {
  const id=req.params.id;
  Actor.findOne({"_id":id}).then(obj=>res.status(200).json({
    message:res.__('actors.get_s'),
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message:res.__('actors.get_f'),
    error: e
  }));
}
function create(req, res, next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  let actor=new Actor({
    name: name,
    lastName: lastName
  });
  actor.save().then(obj=>res.status(200).json({
    message:res.__('actors.success'),
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message:res.__('actors.fail'),
    obj: e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let name=req.body.name ? req.body.name : "";
    let lastName=req.body.lastName ? req.body.lastName : "";
    let actor = new Object({
        _name: name,
        _lastName: lastName
    });
    Actor.findOneAndUpdate({"_id":id},actor,{new:true}).then(obj=>res.status(200).json({
        message:res.__('actors.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('actors.modify_f'),
        error: e
    }));
}
function edit(req, res, next) {
    const id=req.params.id;
    let name=req.body.name;
    let lastName=req.body.lastName;
    let actor = new Object();
    if(name){
        actor._name=name;
    }
    if(lastName){
        actor._lastName=lastName;
    }
    Actor.findOneAndUpdate({"_id":id},actor,{new:true}).then(obj=>res.status(200).json({
        message:res.__('actors.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('actors.modify_f'),
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Actor.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('actors.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('actors.destroy_f'),
        error: e
    }))
}
module.exports={getActors,getActor,create,replace,edit,destroy};