const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { BadRequest, UnAuthenticated } = require('../errors')

//REGISTER USER
const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user: { id: user.id, username: user.username, email: user.email, password: user.password }, token })
}

//REGISTER USER
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest('please provide email and password');
    }

   
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnAuthenticated('no user found');
    }

    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
        throw new BadRequest('wrong password');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { id: user.id, username: user.username, email: user.email }, token })

}


// GET USER BY NAME
const getUserByName = async (req, res) => {
    const { username } = req.params; 

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new NotFound('User not found');
        }

        res.status(StatusCodes.OK).json({ user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}



module.exports = { register, login,getUserByName }