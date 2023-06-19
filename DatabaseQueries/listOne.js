const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');
const { query } = require("express");


const getOne = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      input = req.query
      quoteModel.find(input)
      .then(
        result => {
          res.send(result);
          //console.log("listing one")
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })

}

module.exports = { getOne }