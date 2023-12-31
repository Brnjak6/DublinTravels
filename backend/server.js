require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const itineraryRoutes = require('./routes/itineraries');
const userRoutes = require('./routes/itineraries');

// storing expressJS into a variable
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://dt-frontend.onrender.com'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

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
