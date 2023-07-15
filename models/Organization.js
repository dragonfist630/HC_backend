// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  member: {
    type: String
  },
  name: {
    type: String
  },
  organization: [],
  role: [],
  img: {
    type: String
  },
  link:{
    type: String
  },
  size :{
    type:Number
  }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
