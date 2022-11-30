const express=require("express");
const { findOneAndUpdate } = require("../models/genre");
const Genre=require('../models/genre');
const config = require('config');

function getGenres(req, res, next) {
    Genre.find().then(obj=>res.status(200).json({
        message:res.__('genre.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('genre.list_f'),
        error: e
    }));
}
function getGenre(req, res, next) {
  const id=req.params.id;
  Genre.findOne({"_id":id}).then(obj=>res.status(200).json({
    message:res.__('genre.get_s'),
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message:res.__('genre.get_f'),
    error: e
  }));
}
function create(req, res, next) {
  const description=req.body.description;
  const status=req.body.status;
  let genre=new Genre({
    description: description,
    status: status
  });
  genre.save().then(obj=>res.status(200).json({
    message:res.__('genre.success'),
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message:res.__('genre.fail'),
    obj: e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let description=req.body.description ? req.body.description : "";
    let status=req.body.status ? req.body.status : false;
    let genre = new Object({
        _description: description,
        _status: status
    });
    Genre.findOneAndUpdate({"_id":id},genre,{new:true}).then(obj=>res.status(200).json({
        message:res.__('genre.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('genre.modify_f'),
        error: e
    }));
}
function edit(req, res, next) {
    const id=req.params.id;
    let description=req.body.description;
    let status=req.body.status;
    let genre = new Object();
    if(description){
        genre._description=description;
    }
    if(status){
        genre._status=status;
    }
    Genre.findOneAndUpdate({"_id":id},genre,{new:true}).then(obj=>res.status(200).json({
        message:res.__('genre.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('genre.modify_f'),
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Genre.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('genre.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('genre.destroy_f'),
        error: e
    }))
}
module.exports={getGenres,getGenre,create,replace,edit,destroy};