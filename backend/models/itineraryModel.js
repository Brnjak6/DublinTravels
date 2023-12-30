const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creating the main schema for storing user's itinerary in the database
const itinerarySchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    carrier: {
      type: String,
      required: true
    },
    departure: {
      type: Date,
      required: true
    },
    eventDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Itinerary', itinerarySchema);
