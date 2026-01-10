const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    redirectUrl: {
      type: String,
      required: true,
      trim: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(Url, urlSchema);
