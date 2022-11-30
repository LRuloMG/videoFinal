const mongoose=require('mongoose');
const schema=mongoose.Schema({
	_name: String,
	_lastName: String,
	_phone: String,
	_address: {
		street: String,
		number: String,
		zip: Number,
		state: String
	}
});

class Member {
	constructor(name,lastName,phone,address){
		this._name=name;
		this._lastName=lastName;
		this._phone=phone;
		this._address=address;
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

	get phone(){
		return this._phone;
	}

	set phone(phone){
		this._phone=phone;	
	}

	get address(){
		return this._address;
	}

	set address(address){
		this._address=address;	
	}
}
schema.loadClass(Member);
module.exports=mongoose.model('Member',schema);