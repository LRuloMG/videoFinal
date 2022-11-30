const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _date:String,
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: "Member"
    },
    _copy: {
        type: mongoose.Schema.ObjectId,
        ref: "Copy"
    }
});
class Booking {
    constuctor(date,member,copy){
        this._date=date;
        this._member=member;
        this._copy=copy;
    }
    get date(){
        return this._date;
    }
    set date(date){
        this._date=date;
    }
    get member(){
        return this._member;
    }
    set member(member){
        this._member=member;
    }
    get copy(){
        return this._copy;
    }
    set copy(copy){
        this._copy=copy;
    }
}
schema.loadClass(Booking);
module.exports=mongoose.model('Booking',schema);
