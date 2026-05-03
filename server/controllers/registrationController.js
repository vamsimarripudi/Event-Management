const Registration = require("../models/RegistrationModel");
const User = require("../models/User")
const {Event} = require("../models/Event");
const {generateEmailHTML, buildStyledEmail} = require("../services/aiService");
const {sendEmail} = require("../mailer");


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

    let html;

    const eventName= event.name
    const eventDate = event.dateTime.start
    console.log(`Event Name:${eventName}, Event Date was:${eventDate}` )
    try{
      html = await generateEmailHTML({eventName,eventDate});
    }catch(err){
      html: `
        <div style="font-family:Arial, Helvetica, sans-serif; background:#f6f6f6; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:#111; color:#fff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Event Registration Confirmed</h2>
            </div>

            <!-- Body -->
            <div style="padding:25px;">
              <p style="font-size:16px;">Hi ${user.name || "there"},</p>

              <p style="font-size:15px; color:#333;">
                You have successfully registered for the following event:
              </p>

              <div style="background:#f9f9f9; padding:15px; border-radius:6px; margin:20px 0;">
                <p style="margin:5px 0;"><b>Event:</b> ${event.name}</p>
                <p style="margin:5px 0;"><b>Date:</b> ${new Date(event.dateTime.start).toLocaleString()}</p>
                <p style="margin:5px 0;"><b>Organizer:</b> ${event.organizer || "Event Team"}</p>
              </div>

              <p style="font-size:14px; color:#555;">
                We’re excited to have you with us. Make sure to check your dashboard for updates and event details.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center; margin:25px 0;">
                <a href="https://event.vamsimarripudi.tech/dashboard"
                  style="background:#111; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:14px;">
                  View Dashboard
                </a>
              </div>

              <p style="font-size:14px; color:#555;">
                If you have any questions, feel free to reach out.
              </p>

              <p style="margin-top:25px;">
                Regards,<br/>
                <b>Event Management Team</b>
              </p>
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.name}">
                Add to Calendar
              </a>
            </div>

            <!-- Footer -->
            <div style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Event Management. All rights reserved.
            </div>

          </div>
        </div>
        `
    }

    const styledHTML = buildStyledEmail({event,user});

    sendEmail({
      to:user.email,
      subject: "Event Registration Confirmed",
      html: styledHTML
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

    
    const user = await User.findById(req.user.id);

    // async email (don’t block response)
    sendEmail({
      to: user.email,
      subject: "Registration Cancelled",
      html: `
        <div style="font-family:Arial, Helvetica, sans-serif; background:#f6f6f6; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:#d32f2f; color:#fff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Registration Cancelled</h2>
            </div>

            <!-- Body -->
            <div style="padding:25px;">
              <p style="font-size:16px;">Hi ${user.name || "there"},</p>

              <p style="font-size:15px; color:#333;">
                Your registration has been successfully cancelled for the event below:
              </p>

              <div style="background:#f9f9f9; padding:15px; border-radius:6px; margin:20px 0;">
                <p style="margin:5px 0;"><b>Event:</b> ${event.name}</p>
                <p style="margin:5px 0;"><b>Date:</b> ${new Date(event.dateTime.start).toLocaleString()}</p>
                <p style="margin:5px 0;"><b>Organizer:</b> ${event.organizer || "Event Team"}</p>
              </div>

              <p style="font-size:14px; color:#555;">
                We’re sorry to see you go. If this was unintentional, you can register again anytime.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center; margin:25px 0;">
                <a href="https://event.vamsimarripudi.tech/events"
                  style="background:#111; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:14px;">
                  Browse Events
                </a>
              </div>

              <p style="font-size:14px; color:#555;">
                If you have any questions, feel free to reach out.
              </p>

              <p style="margin-top:25px;">
                Regards,<br/>
                <b>Event Management Team</b>
              </p>
            </div>

            <!-- Footer -->
            <div style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Event Management. All rights reserved.
            </div>

          </div>
        </div>
        `
    }).catch(err => console.error("Cancel email failed:", err.message));

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

