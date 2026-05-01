const mongoose = require("mongoose");

const websiteFeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // allow guest feedback
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  category: {
    type: String,
    enum: ["bug", "suggestion", "general"],
    default: "general",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  page: {
    type: String, // e.g., "/events", "/dashboard"
  },
}, { timestamps: true });


const FeedbackSchema = new mongoose.Schema({
  feedback:{
    type:String,
    required:true,
  },
  sentiment:String,
  summary:String,
  issues:[String],
  suggestions:[String],
  source:{
    type:String,
    default:"app",
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },

});

module.exports = mongoose.model("WebsiteFeedback", websiteFeedbackSchema);
module.exports = mongoose.model("Feedback", FeedbackSchema)