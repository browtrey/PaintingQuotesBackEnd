const express = require('express');
const app = express();
const port = 8887;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X - Requested - With, Content - Type, Accept");
  next();
})

app.listen(port, () => console.log(`Server running at localhost:
${port}!`))

const mongoose = require('mongoose');
const DataBase = 'mongodb://localhost:27017/quotations';
const quoteSchema = new mongoose.Schema({
  Id: Number,
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
const quote = mongoose.model('quote', quoteSchema);
mongoose.connect(DataBase,
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => { console.log(err); })
db.once('open', () => {

  app.post('/add', (req, res) => {
    input = req.body.params;
    quote.create(input)
      .then(
        result => {
          res.send({ "message": 'Record added' });
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  app.get('/listAll', (req, res) => {
    input = req.query;
    quote.find(input)
      .then(
        result => {
          res.send(result);
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  app.get('/deleteAll', (res) => {
    quote.deleteMany()
      .then(
        result => {
          console.log("All deleted");
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  app.get('/deleteOne', (req, res) => {
    input = req.query;
    quote.deleteOne(input)
    .then(
      result => {
        console.log("One Record Deleted")
      },
      err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

});