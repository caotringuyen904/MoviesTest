const mongoose = require("mongoose")

const Movie = mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        require: true,
    },
    year: {
        type: Number,
        require: true,
    },
    image: {    
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("movies", Movie)    