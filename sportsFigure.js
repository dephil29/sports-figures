const mongoose = require('mongoose');

const sportsFigureSchema = {
  name: String,
  pictureUrl: String,
  sport: String,
  achievements: [String]
}

module.exports = function(db){
  return db.model('sportsFigure', sportsFigureSchema);
};
