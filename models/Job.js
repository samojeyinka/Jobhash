const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Provide company name'],
        maxlength: [50, 'Company name should not exceed 50 characters'],
        trim: true
    },

    position: {
        type: String,
        required: [true, 'Provide your area of specialization'],
        maxlength: [100, 'position should not exceed 100 characters'],
        trim: true
    },

    status: {
        type: String,
        enum : ['pending', 'interviewed', 'declined'],
        default: 'pending' // Set the default value to lowercase
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });



module.exports = mongoose.model('Job', JobSchema);  