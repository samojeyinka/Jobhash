const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide your username'],
        maxlength: 30,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Provide your email'],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'provide valid email'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Provide your password'],
        maxlength: 30
    },
});

//HASH THE PASSWORD 
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//USE JWT
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, username: this.username, email: this.email, password: this.password },process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME,
    })
}

//COMPARE PASSWORD FOR LOGIN ACCESS
UserSchema.methods.comparePassword = async function (userPassword) {
    const pswCorrect = await bcrypt.compare(userPassword, this.password);
    return pswCorrect;
}

module.exports = mongoose.model('User', UserSchema);