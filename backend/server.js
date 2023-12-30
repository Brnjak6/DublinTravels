require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const itineraryRoutes = require('./routes/itineraries');
const userRoutes = require('./routes/itineraries');

// storing expressJS into a variable
const app = express();

//middleware
//parsing raw data to JSON instantly
app.use(express.json());

//routes
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/user', userRoutes);

//connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //start the DB
    app.listen(process.env.PORT, () => {
      console.log('listening to the port ' + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
