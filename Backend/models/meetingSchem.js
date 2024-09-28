const { mongoose } = require("mongoose");

const meetingSchema = new mongoose.Schema({
    user_id : String ,
    meeting_code : {
        type : String ,
        required : true ,
        unique : true
    },
    date : {
        type : Date ,
        default : Date.now() ,
        required : true
    }
}) ;

module.exports = mongoose.module("Meeting",meetingSchema)
