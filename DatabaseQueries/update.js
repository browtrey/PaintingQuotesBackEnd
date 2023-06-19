const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');

const updateQuote = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      id = req.body.params[0].id;
      //console.log(id)
      newInfo = req.body.params[1];
      quoteModel.updateOne({ _id: id }, { $set: newInfo })
        .then(
          result => {
            res.send(result);
            //console.log("Quote Updated")
          },
          err => { res.send(err.message); })
        .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })
}

module.exports = { updateQuote }