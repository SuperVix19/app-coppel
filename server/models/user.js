const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:  {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minLength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 10
    },
}, 
{
    timestamps: true 
});

module.exports = model('User', userSchema);