const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const upcomingmovieSchema = new Schema({
    title: String,
    release_date: String,
    overview: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Upcomingmovie', upcomingmovieSchema);