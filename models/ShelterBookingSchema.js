const mongoose = require('mongoose');
const ShelterBookingSchema =  new mongoose.Schema(
{
    booking_id:{
        type: Integer ,
        required : true ,
        unique : true
    },
    shelter_id : {
        type : Integer ,
        required : true ,
        unique : true

    },
    user_id : {
        type : Integer ,
        required : true ,
        unique : true

    },
    booking_date : {
        type : Date ,
        required : true ,
    },
    check_in_date : {
         type : Date ,
        required : true ,
    } ,
    check_out_date : {
         type : Date ,
        required : true ,
    },
    status : {
        type : String ,
        enum : ["pending",'confirmed','refunded'],
        required : true ,
    },
    total_price :{
        type : Number ,
        required : true ,
    },
    payment_status :{
        type : String,
        enum : ["unpain",'paid','refunded'],
        required : true ,
    },
    created_at :{
        type : Date ,
        default : Date.now ,
        required : true ,
    } ,
    updated_at : {
        type : Date ,
        default : Date.now ,
        required : false ,
    }
},{ timestamps: true }

);
module.exports = mongoose.model("ShelterBooking",ShelterBookingSchema)