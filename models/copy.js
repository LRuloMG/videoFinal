const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _number:Number,
    _format: {
        type: String,
        enum:['VHS','DVD','BLU_RAY'],
        default:'DVD'
    },
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie"
    },
    _status: {
        type: String,
        enum:['Available','Rented'],
        default:'Available'
    }
});
class Copy {
    constuctor(number,format,movie,status){
        this._number=number;
        this._format=format;
        this._movie=movie;
        this._status=status;
    }
    get number(){
        return this._number;
    }
    set number(number){
        this._number=number;
    }
    get format(){
        return this._format;
    }
    set format(format){
        this._format=format;
    }
    get movie(){
        return this._movie;
    }
    set movie(movie){
        this._movie=movie;
    }
    get status(){
        return this._status;
    }
    set status(status){
        this._status=status;
    }
    
}
schema.loadClass(Copy);
module.exports=mongoose.model('Copy',schema);
