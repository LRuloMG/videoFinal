const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _title:String,
    _genre: {
        type: mongoose.Schema.ObjectId,
        ref: "Genre"
    },
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: "Director"
    },
    _actors:[{
        type: mongoose.Schema.ObjectId,
        ref: "Actor"
    }]
});

class Movie {
    constuctor(title,genre,director,actors){
        this._title=title;
        this._genre=genre;
        this._director=director;
        this._actors=actors;
    }
    get title(){
        return this._title;
    }
    set title(title){
        this._title=title;
    }
    get genre(){
        return this._genre;
    }
    set genre(genre){
        this._genre=genre;
    }
    get director(){
        return this._director;
    }
    set director(director){
        this._director=director;
    }
    get actors(){
        return this._actors;
    }
    set actors(actors){
        this._actors=actors;
    }
}
schema.loadClass(Movie);
module.exports=mongoose.model('Movie',schema);