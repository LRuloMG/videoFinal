const express=require("express");
const { findOneAndUpdate } = require("../models/movie");
const Movie=require('../models/movie');
const Genre=require('../models/genre');
const Director=require('../models/director');
const Actor = require("../models/actor");
const config = require('config');

function getMovies(req, res, next) {
    Movie.find().then(obj=>res.status(200).json({
        message:res.__('movie.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('movie.list_f'),
        error: e
    }));
}
function getMovie(req, res, next) {
  const id=req.params.id;
  Movie.findOne({"_id":id}).then(obj=>res.status(200).json({
    message:res.__('movie.get_s'),
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message:res.__('movie.get_f'),
    error: e
  }));
}
async function create(req, res, next) {
  let actors=[];
  const title=req.body.title;
  const genreId=req.body.genreId;
  const directorId=req.body.directorId;
  const actorsIds=[req.body.actorsIds];
  let genre=await Genre.findOne({"_id":genreId});
  let director=await Director.findOne({"_id":directorId});
  if(actorsIds.length>1){
  for(const actorId of actorsIds){
    actors.push(await Actor.findOne({"_id:":actorId}));
  };}else{
    actors.push(await Actor.findOne({"_id:":actorsIds}));
  }
  let movie=new Movie({
    title:title,
    genre: genre,
    director: director,
    actors: actors
  });
  movie.save().then(obj=>res.status(200).json({
    message:res.__('movie.success'),
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message:res.__('movie.fail'),
    obj: e
  }));
}
async function replace(req, res, next) {
    let actors=[];
    const id=req.params.id;
    const title=req.body.title ? req.body.title : "";
    const genreId=req.body.genreId ? req.body.genreId : 0;
    const directorId=req.body.directorId ? req.body.directorId : 0;
    const actorsIds=req.body.actors ? [req.body.actorsIds] : [];
    let genre=await Genre.findOne({"_id":genreId});
    let director=await Director.findOne({"_id":directorId});
    if(actorsIds.length>1){
        for(const actorId of actorsIds){
          actors.push(await Actor.findOne({"_id:":actorId}));
        };}else{
          actors.push(await Actor.findOne({"_id:":actorsIds}));
        }
    let movie = new Object({
        _title:title,
        _genre: genre,
        _director: director,
        _actors: actors
    });
    Movie.findOneAndUpdate({"_id":id},movie,{new:true}).then(obj=>res.status(200).json({
        message:res.__('movie.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('movie.modify_f'),
        error: e
    }));
}
async function edit(req, res, next) {
    let actors=[];
    const id=req.params.id;
    const title=req.body.title;
    const genreId=req.body.genreId;
    const directorId=req.body.directorId;
    const actorsIds=[req.body.actorsIds];
    if(actorsIds.length>1){
        for(const actorId of actorsIds){
          actors.push(await Actor.findOne({"_id:":actorId}));
        };}else{
          actors.push(await Actor.findOne({"_id:":actorsIds}));
    }
    let genre=await Genre.findOne({"_id":genreId});
    let director=await Director.findOne({"_id":directorId});
    let movie = new Object();
    if(title){
        movie._title=title;
    }
    if(genre){
        movie._genre=genre;
    }
    if(director){
        movie._director=director;
    }
    if(actors){
        movie._actors=actors;
    }
    Movie.findOneAndUpdate({"_id":id},movie,{new:true}).then(obj=>res.status(200).json({
        message:res.__('movie.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('movie.modify_f'),
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Movie.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('movie.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('movie.destroy_f'),
        error: e
    }))
}
module.exports={getMovies,getMovie,create,replace,edit,destroy};