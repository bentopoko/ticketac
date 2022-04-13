<<<<<<< HEAD
//  this is my schema for my databse 


=======
>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
const mongoose = require('mongoose');

var journeySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var journeyModel = mongoose.model('journey', journeySchema);
<<<<<<< HEAD

=======
>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
  module.exports = journeyModel