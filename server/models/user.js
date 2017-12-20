var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    listings: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing' 
    }],
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);