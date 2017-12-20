var mongoose = require('mongoose');

var ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be atleast 2 characters'],
        minLength: 2
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ''
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

var Listing = mongoose.model('Listing', ListingSchema);