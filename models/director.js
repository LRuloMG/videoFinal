const mongoose=require('mongoose');
const schema=mongoose.Schema({
    _name:String,
    _lastName: String
});
class Director {
    constuctor(name,lastName){
        this._name=name;
        this._lastName=lastName;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name=name;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(lastName){
        this._lastName=lastName;
    }
}
schema.loadClass(Director);
module.exports=mongoose.model('Director',schema);
