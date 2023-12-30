const express = require('express');

//Importing all the logic from controllers, but keeping the logic separated to keep it organised and clean
const {
  getItineraries,
  getUserEvents,
  createItinerary,
  deleteItinerary,
} = require('../controllers/itineraryController');

const { loginUser, signupUser } = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

// user login
router.post('/login', loginUser);

// user signup
router.post('/signup', signupUser);
router.get('/', getItineraries);
// middleware to prevent access to below routes if the user is not verified
// under account route, we only get itineraries made by the current user
router.use(checkAuth);

//getting user's itineraries
router.get('/account', getUserEvents);

//posting an itinerary
router.post('/', createItinerary);

//deleting an itinerary
router.delete('/:id', deleteItinerary);

module.exports = router;
