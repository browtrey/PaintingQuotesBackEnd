const express = require('express');
const app = express();
const port = 8888;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
  next();
})

app.listen(port, () => console.log(`Server running at localhost:
${port}!`))


const mongoose = require('mongoose');

//connects to database
/*
app.get('/setup', (req, res) => {
  const databaseName = req.query.db
  const collectionName = req.query.col
  console.log("db: " + databaseName + "------" + "col: " + collectionName)

  const DataBase = 'mongodb://localhost:27017/' + databaseName;
  console.log(DataBase)
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
  console.log(quoteSchema)
  const quote = mongoose.model(collectionName, quoteSchema);
  mongoose.connect(DataBase, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', (err) => { console.log(err); })
  res.send("database created")

});
*/
const DataBase = 'mongodb://localhost:27017/quotations';
console.log(DataBase)
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
mongoose.connect(DataBase, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => { console.log(err); })

db.once('open', () => {
  //adds to database
  app.post('/add', (req, res) => {
    input = req.body.params;
    quote.create(input)
      .then(
        result => {
          console.log(result);
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  //lists all objects in a database
  app.get('/listAll', (req, res) => {
    quote.find()
      .then(
        result => {
          res.send(result);
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  //list a single object in database
  app.get('/listOne', (req, res) => {
    input = req.query;
    console.log(input)
    quote.find(input)
      .then(
        result => {
          console.log("Listing One:")
          res.send(result);
          console.log(result);
          console.log("--------------------------")
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  //deletes all objects in database
  app.delete('/deleteAll', (res) => {
    quote.deleteMany()
      .then(
        result => {
          console.log("All deleted");
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  //deletes a single object
  app.delete('/deleteOne', (req, res) => {
    input = req.query.Id;
    console.log(input)
    quote.deleteOne({_id: input})
      .then(
        result => {
          console.log("One Record Deleted");
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });

  //updates a single object
  app.put('/update', (req, res) => {
    id = req.body.params[0].id;
    console.log(id)
    newInfo = req.body.params[1];
    quote.updateOne({ _id: id }, { $set: newInfo })
      .then(
        result => {
          res.send(result);
          console.log("Quote Updated")
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
  });
});