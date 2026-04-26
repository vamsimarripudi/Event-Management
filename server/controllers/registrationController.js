const Registration = require("../models/RegistrationModel");
const {Event} = require("../models/Event");


const registerForEvent = async (req,res) => {
    const {eventId} = req.body;
    try{
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({message:"Event not found"})
        }
        if(event.dateTime < new Date()){
            return res.status(400).json({message:"Cannot register for past events"})
        }
        if(event.capacity <= 0){
            return res.status(400).json({message:"Event is full"})
        }   
        const existingRegistration = await Registration.findOne({userId:req.user.id, eventId});
        if(existingRegistration){
            return res.status(400).json({message:"Already registered for this event"})
        }
        const registration = new Registration({
            userId:req.user.id,
            eventId
        });
        const reduceAvailability = await Event.findByIdAndUpdate(eventId, {$inc:{capacity:-1}}, {new:true});    
        
        await reduceAvailability.save();

        await registration.save();
        res.status(201).json({message:"Registered successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const myRegistrations = async (req,res) => {
    try{
        const registrations = await Registration.find({userId:req.user.id}).populate("eventId");        
        res.json(registrations);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const pastRegistrations = async (req,res) => {
    try{
        const registrations = await Registration.find({userId:req.user.id}).populate("eventId");
        const pastEvents = registrations.filter(reg => reg.eventId.date < new Date());
        res.json(pastEvents);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const upcomingRegistrations = async (req,res) => {
    try{
        const registrations = await Registration.find({userId:req.user.id}).populate("eventId");
        const upcomingEvents = registrations.filter(reg => reg.eventId.date >= new Date());
        res.json(upcomingEvents);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


const cancelRegistration = async (req,res) => {
    const {registrationId} = req.body;
    try{
        const registration = await Registration.findById(registrationId);
        if(!registration){
            return res.status(404).json({message:"Registration not found"})
        }
        if(registration.userId.toString() !== req.user.id){
            return res.status(403).json({message:"Unauthorized"})
        }
        const event = await Event.findById(registration.eventId);

        if(event.date < new Date()){
            return res.status(400).json({message:"Cannot cancel registration for past events"})
        }
        await Registration.findByIdAndDelete(registrationId);
        await Event.findByIdAndUpdate(registration.eventId, {$inc:{capacity:1}}, {new:true});
        res.json({message:"Registration cancelled successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


module.exports = {
  registerForEvent,
  getUserRegistrations: myRegistrations, // keep route name consistent
  cancelRegistration,
  pastRegistrations,
  upcomingRegistrations,
};    

