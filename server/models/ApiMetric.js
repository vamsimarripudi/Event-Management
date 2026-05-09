const mongoose = require("mongoose");

const apiMetricSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },

  method: {
    type: String,
    required: true,
  },

  statusCode: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "ApiMetric",
  apiMetricSchema
);