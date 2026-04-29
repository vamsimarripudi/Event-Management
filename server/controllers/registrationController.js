const Registration = require("../models/RegistrationModel");
const User = require("../models/User")
const {Event} = require("../models/Event");
const sendEmail = require("../mailer");


const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const user = await User.findById(req.user.id);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (new Date(event.dateTime.start) < new Date()) {
      return res.status(400).json({
        message: "Cannot register for past events",
      });
    }

    if (event.capacity <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }

    const existingRegistration = await Registration.findOne({
      userId: req.user.id,
      eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered",
        registrationId: existingRegistration._id,
      });
    }

    const registration = await Registration.create({
      userId: req.user.id,
      eventId,
    });

    await Event.findByIdAndUpdate(eventId, {
      $inc: { capacity: -1 },
    });

    sendEmail({
      to:user.email,
      subject: "Event Registration Confirmed",
      html: `
        <h2>Registration Successfull</h2>
        <p><b>Event: </b>${event.name}</p>
        <p><b>Date: </b>${event.dateTime.start}</p>
        <a href="https://event.vamsimarripudi.tech/dashboard">
        Go to Dashboard
        </a>
      `
    });

    return res.status(201).json({
      message: "Registered successfully",
      isRegistered: true,
      registrationId: registration._id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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


const cancelRegistration = async (req, res) => {
  const { registrationId } = req.body;

  try {
    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    if (registration.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const event = await Event.findById(registration.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Registration.findByIdAndDelete(registrationId);

    await Event.findByIdAndUpdate(registration.eventId, {
      $inc: { capacity: 1 },
    });

    return res.json({
      message: "Cancelled successfully",
      isRegistered: false,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegistrationStatus = async (req, res) => {
  const { eventId } = req.query;

  try {
    const registration = await Registration.findOne({
      userId: req.user.id,
      eventId,
    });

    return res.json({
      isRegistered: !!registration,
      registrationId: registration?._id || null,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerForEvent,
  getUserRegistrations: myRegistrations, // keep route name consistent
  cancelRegistration,
  pastRegistrations,
  upcomingRegistrations,
  getRegistrationStatus,
};    

