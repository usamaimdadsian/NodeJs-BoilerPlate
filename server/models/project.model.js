const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  url:{
      type: String
  },
  image:{
      type: String
  },
  content:{
    type: String
  }
});

module.exports = mongoose.model('Project', ProjectSchema);