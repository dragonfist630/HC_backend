const mongoose = require('mongoose');

const listOfOrgSchema = new mongoose.Schema({
    name: {
        type: String
    },
    img: {
        type: String
    }
})

const listOfOrg = mongoose.model('listOfOrg',listOfOrgSchema);

module.exports = listOfOrg;