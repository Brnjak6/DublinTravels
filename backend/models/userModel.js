const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// creating necessary requirements for a new user
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

//static signup
//creating static function where we take email and password from a user and if the email/user does not exist, we allow them to sign up, secure their password with bcrypt before it is sent to database and a new user is created
userSchema.statics.signup = async function (email, password, username) {

  //checking if the email typed by user exists in the database already
  const exists = await this.findOne({ email });


  if (exists) {
    throw Error('Email already taken');
  } else {
    //selecting how many characters the package will use to encrypt the password and then hashing it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;
  }
};

//static login
userSchema.statics.login = async function (email, password) {
  //if the email is correct and exists, it will put whole user into constant
  const userExists = await this.findOne({ email });

  if (!userExists) {
    throw Error('Email not found');
  }

  //comparing user input password to the password of a user in the database
  const match = await bcrypt.compare(password, userExists.password);

  if (!match) {
    console.log('Password is incorrect');
    throw Error('Wrong password');
  }

  return userExists;
};

module.exports = mongoose.model('User', userSchema);
