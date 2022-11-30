const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _description:String,
    _status: Boolean
});
class Genre {
    constuctor(description,status){
        this._description=description;
        this._status=status;
    }
    get description(){
        return this._description;
    }
    set description(description){
        this._description=description;
    }
    get status(){
        return this._status;
    }
    set status(status){
        this._status=status;
    }
}
schema.loadClass(Genre);
module.exports=mongoose.model('Genre',schema);