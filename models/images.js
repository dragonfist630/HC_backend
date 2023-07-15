const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    name:{
        type: String
    },
    image:{
        type : Buffer
    }
});

const images = mongoose.model('images', imagesSchema);

module.exports = images;