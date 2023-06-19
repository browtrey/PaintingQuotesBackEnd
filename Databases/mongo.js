const mongoose = require('mongoose');
require('dotenv').config();
const mongo_uri = process.env.MONGO_URI

var db = mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  //console.log('external db working');
})
mongoose.connection.on('error', (e) => {
  console.log(e);
})

module.exports = async () => {db}