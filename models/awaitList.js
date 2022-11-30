const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: "Member"
    },
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie"
    }
});
class AwaitList {
    constuctor(member,movie){
        this._member=member;
        this._movie=movie;
    }
    get member(){
        return this._member;
    }
    set member(member){
        this._member=member;
    }
    get movie(){
        return this._movie;
    }
    set movie(movie){
        this._movie=movie;
    }
}
schema.loadClass(AwaitList);
module.exports=mongoose.model('AwaitList',schema);
