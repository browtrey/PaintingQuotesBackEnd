const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');

const addQuote = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      input = req.body.params;
      quoteModel.create(input)
        .then(
          result => {
            //console.log(result);
          },
          err => { res.send(err.message); })
        .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })
}

module.exports = { addQuote }