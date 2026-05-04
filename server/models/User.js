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
    default:"https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
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
