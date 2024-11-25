const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        publishDate:{
            type: String,
            required: true,
        }
    },
    {
        Timestamp: true

    },
);


module.exports = mongoose.model('Book', bookSchema);