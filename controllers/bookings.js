const express=require("express");
const {findOneAndUpdate} = require("../models/booking");
const Booking=require('../models/booking');
const Member=require('../models/member');
const Copy=require('../models/copy');
const { copy } = require("../routes");
const config = require('config');

function getBookings(req, res, next){
    Booking.find().then(obj=>res.status(200).json({
        message:res.__('booking.list_s'),
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message:res.__('booking.list_f'),
        error: e
    }));
}

function getBooking(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('booking.get_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('booking.get_f'),
        error: e
    }));
}

async function create(req, res, next){
    const date=req.body.date;
    const memberId=req.body.memberId;
    const copyId=req.body.copyId;

    let member=await Member.findOne({"_id":memberId});
    let copy=await Copy.findOne({"_id":copyId});
    let booking=new Booking({
        date:date,
        member: member,
        copy: copy
    });
    booking.save().then(obj=>res.status(200).json({
        message:res.__('booking.success'),
        obj: obj
    }))
    .catch(e => res.status(500).json({
        message:res.__('booking.fail'),
        obj: e
    }));
}

async function replace(req, res, next){
    const id=req.params.id;
    const date=req.body.date ? req.body.date : "";
    const memberId=req.body.memberId ? req.body.memberId : 0;
    const copyId=req.body.copyId ? req.body.copyId : 0;
    let member=await Member.findOne({"_id":copyId});
    let booking = new Object({
        _date:date,
        _member: member,
        _copy: copy,
    });
    Booking.findOneAndUpdate({"_id":id},booking,{new:true}).then(obj=>res.status(200).json({
        message:res.__('booking.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('booking.modify_f'),
        error: e
    }));
}

async function edit(req, res, next){
    const id=req.params.id;
    const date=req.body.date;
    const memberId=req.body.memberId;
    const copyId=req.body.copyId;
    let member=await Member.findOne({"_id":memberId});
    let copy=await Copy.findOne({"_id":copyId});
    let booking = new Object()

    if(date){
        booking._date=date;
    }
    if(member){
        booking._member=member;
    }
    if(copy){
        booking._copy=copy;
    }
    Booking.findOneAndUpdate({"_id":id},booking,{new:true}).then(obj=>res.status(200).json({
        message:res.__('booking.modify_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('booking.modify_f'),
        error: e
    }));
}

function destroy(req, res, next) {
    const id=req.params.id;
    Booking.remove({"_id":id}).then(obj=>res.status(200).json({
        message:res.__('booking.destroy_s'),
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message:res.__('booking.destroy_f'),
        error: e
    }))
}
module.exports={getBookings,getBooking,create,replace,edit,destroy};
