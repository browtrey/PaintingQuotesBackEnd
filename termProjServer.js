const express = require('express');
const app = express();
const port = 8888;
const bodyParser = require('body-parser');

const { getAll } = require("./DatabaseQueries/listAll");
const { addQuote } = require("./DatabaseQueries/add");
const { getOne } = require("./DatabaseQueries/listOne");
const { updateQuote } = require("./DatabaseQueries/update");
const { deleteOneQuote } = require("./DatabaseQueries/deleteOne");
const { deleteAllQuotes } = require("./DatabaseQueries/deleteAll");
const { getCount } = require("./DatabaseQueries/getCount");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.listen(port, () => console.log(`Server running at localhost: ${port}!`));

//adds to database
app.post('/add', (req, res) => {
  addQuote(req, res);
});

//lists all objects in a database
app.get('/listAll', (req, res) => {
  getAll(req, res);
});

//list a single object in database
app.get('/listOne', (req, res) => {
  getOne(req, res);
});

//deletes all objects in database
app.delete('/deleteAll', (res) => {
  deleteAllQuotes(res);
});

//deletes a single object
app.delete('/deleteOne', (req, res) => {
  deleteOneQuote(req, res);
});

//updates a single object
app.put('/update', (req, res) => {
  updateQuote(req, res);
});

//gets the amount of objects in the database
app.get('/getCount', (req, res) => {
  getCount(req, res);
});