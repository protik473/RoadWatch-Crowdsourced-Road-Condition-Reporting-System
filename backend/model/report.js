const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  imageUrl: String,
  severity: String,
  status: {
    type: String,
    default: "Reported"
  },
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
