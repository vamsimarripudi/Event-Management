const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
email: {
    type: String,
    required: true,
    unique: true,
    },
role :{
    type:String,
    enum:["user","developer","organizer"],
    default:"user"
},
avatarUrl:{
    type:String,
    default:""
},
password: {
    type: String,
    required: true,      
},
registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',   
}],
resetPasswordToken:String,
resetPasswordExpires:Date,


});
const User = mongoose.model("User", userSchema);
module.exports = User;
