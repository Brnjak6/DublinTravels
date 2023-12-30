const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const checkAuth = async (req, res, next) => {
    //With this middleware, we can use it as a security for some of the routes that should be accessed only by those who are signed up

    //Getting the token from request
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'User not authorized'})
    }

    const token = authorization.split(' ')[1]

    try {

        //If token matches and user is verified, then in the below constant we will have matching ID
        const {_id} = jwt.verify(token, process.env.JWT)

        
       req.user = await User.findOne({_id}).select('_id')
       next()
    } catch (error) {
        //If token doesn't match, const verifiedTokenID won't be verified and we will display an error
        console.log(error);
        res.status(401).json({error: 'User not authorized'})
    }
}

module.exports = checkAuth