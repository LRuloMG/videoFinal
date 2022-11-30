const express=require("express");
const Copy=require('../models/copy');
const Movie=require('../models/movie')
const config = require('config');

function getCopies(req, res, next) {
    Copy.find().then(obj=>res.status(200).json({
        message:res.__('copies.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('copies.list_f'),
        error: e
    }));
}
    
function getCopy(req, res, next) {
    const id=req.params.id;
    Copy.findOne({"_id":id}).then(obj=>res.status(200).json({
      message:res.__('copies.get_s'),
      obj: obj
    }))
    .catch(e=>res.status(500).json({
      message:res.__('copies.get_f'),
      error: e
    }));
}

async function create(req, res, next) {
  const number=req.body.number;
  const format=req.body.format;
  const status=req.body.status;
  const movieId=req.body.movieId;
  let movie=await Movie.findOne({"_id":movieId});
  let copy=new Copy({
    number:number,
    format:format,
    status:status,
    movie:movie,
  });
  copy.save().then(obj=>res.status(200).json({
    message:res.__('copies.success'),
    obj:obj
  })).catch(e=>res.status(400).json({
    message:res.__('copies.fail'),
    error:e
  }));
}

async function replace(req, res, next) {
    const id=req.params.id;
    let number=req.body.number ? req.body.number : 0;
    const status=req.body.status ? req.body.status :"";
    const format=req.body.format ? req.body.format :"";
    const movieId=req.body.movieId ? req.body.movieId : 0;
    let movie=await Movie.findOne({"_id":movieId});
    let copy=new Copy({
        number:number,
        format:format,
        status:status,
        movie:movie,
    });
    Copy.findOneAndUpdate({"_id":id},copy,{new:true}).then(obj=>res.status(200).json({
        message:res.__('copies.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('copies.modify_f'),
        error: e
    }));
}

async function edit(req, res, next) {
    const id=req.params.id;
    const number=req.body.number;
    const format=req.body.format;
    const status=req.body.status;
    const movieId=req.body.movieId;
    let movie=await Movie.findOne({"_id":movieId});
    let copy=new Copy();
    if(number){
        copy._number=number;
    }
    if(format){
        copy._format=format;
    }
    if(status){
        copy._status=status;
    }
    if(movie){
        copy._movie=movie;
    }
    Copy.findOneAndUpdate({"_id":id},copy,{new:true}).then(obj=>res.status(200).json({
        message:res.__('copies.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('copies.modify_f'),
        error: e
    }));
}

function destroy(req, res, next) {
    const id=req.params.id;
    Copy.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('copies.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('copies.destroy_f'),
        error: e
    }))}

module.exports={getCopies,getCopy,create,replace,edit,destroy};
