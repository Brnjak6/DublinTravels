const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//Here is the implementation of the logic for logging in, and signing up a user

//This function returns the verification token only if the user logs in successfully
const newToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT, { expiresIn: '1d' });
};

//login user
const loginUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);

  try {
    if (!email || !password) {
      throw Error('One or more empty fields are present');
    }

    //trying to log the user in by running login function from User model and if it matches both email and password, we log user in
    const user = await User.login(email, password, username);

    //Now that the user is logged in, we can access more information from user variable such as their ._id from database
    const token = newToken(user._id);

    res.status(200).json({ email, token, username: user.username });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//signup user from userModel's static method
const signupUser = async (req, res) => {
  //inserting user's email and password into constants from request.body
  const { email, password, username } = req.body;

  try {
    //if the email does not exist already, then a new user will be created and we will return a token as a response to frontend
    const user = await User.signup(email, password, username);

    //we create a token that will be necessary for the user as a proof they are signed up
    const token = newToken(user._id);
    res.status(200).json({ email, token, username });
  } catch (err) {
    res.status(400).json(err.message);
    console.log('Failed to create new user');
  }
};

module.exports = { loginUser, signupUser };
