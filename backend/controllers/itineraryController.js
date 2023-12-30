const Itinerary = require('../models/itineraryModel');
const mongoose = require('mongoose');

//All the logic for CRUD operations on itineraries/events is maintained here

//get all itineraries displayed on the main page
const getItineraries = async (req, res) => {
  const itineraries = await Itinerary.find().sort({ createdAt: -1 });

  res.status(200).json(itineraries);
};

//get all itineraries by a specific user. This will be used to display itineraries in /account for each user
const getUserEvents = async (req, res) => {
  const user_id = req.user._id;
  const itineraries = await Itinerary.find({ user_id }).sort({ createdAt: -1 }); // sorting out itineraries made just by the specific user and sorting it by created date from the database

  res.status(200).json(itineraries);
};


//create a new itinerary and add it to database
const createItinerary = async (req, res) => {
  const user_id = req.user._id;
  const {
    eventName,
    location,
    price,
    username,
    carrier,
    departure,
    eventDate,
  } = req.body;

  try {
    const itinerary = await Itinerary.create({
      eventName,
      location,
      price,
      user_id,
      username,
      carrier,
      departure,
      eventDate,
    });
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete an itinerary
const deleteItinerary = async (req, res) => {
  const { id } = req.params;

  //With the help of mongoose, we can simply search the database by _id and if it matches id from our request, it will delete it from database
  try {
    const itinerary = await Itinerary.findOneAndDelete({ _id: id });

    if (!itinerary) {
      return res.status(400).json({ error: 'Itinerary not found' });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Incorrect ID type' });
    }
  }
};

module.exports = {
  deleteItinerary,
  getItineraries,
  getUserEvents,
  createItinerary,
};
