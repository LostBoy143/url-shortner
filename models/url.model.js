const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
    trim: true,
  },
  visitHistory: {
    type: Date,
    timeStamp: Date.now(),
  },
});
