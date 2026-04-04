const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
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

// avoid recompiling model if it already exists (prevents OverwriteModelError)
const Registration = mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
module.exports = Registration;
