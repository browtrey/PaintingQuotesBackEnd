const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');


const getAll = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      quoteModel.find()
      .then(
        result => {
          res.send(result);
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })

}

module.exports = { getAll }