const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
    organizer: {
    type: String,
    required: true,
    },
    location: {
    type: String,
    required: true,
    },
    
    dateTime:{
    type: Date,
    required: true, 
    },
    description: {
    type: String,
    required: true, 
    },
    capacity: {
    type: Number,
    required: true, 
    },
    availableSeats: {
    type: Number,
    required: true, 
    },
    category: {
    type: String,
    required: true,
    },
    attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    }],

    tags:{
    type: [String],
    required: true, 
    },  
    createdAt: { 
    type: Date,
    default: Date.now,
     },

});

const registrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },  
    registrationDate: {
        type: Date,
        default: Date.now,
    },
}); 


const Event = mongoose.model('Event', eventSchema);
const Registration = mongoose.model('Registration', registrationSchema);
module.exports = { Event, Registration };
