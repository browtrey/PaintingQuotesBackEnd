const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  qDate: String,
  qName: String,
  qAddress: String,
  qEmail: String,
  qNumofRooms: Number,
  qRoom: [{
    roomType: String,
    roomWidth: Number,
    roomLength: Number,
    roomColour: String,
    roomPaintType: String
  }]
});

const quoteModel = mongoose.model('quote', quoteSchema);
module.exports={quoteModel}