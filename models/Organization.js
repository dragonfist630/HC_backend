// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  organization: [],
  role: [],
  image: {
    type: String
  },
  url:{
    type: String
  }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
