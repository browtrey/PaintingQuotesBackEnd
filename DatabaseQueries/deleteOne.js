const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');

const deleteOneQuote = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      input = req.query.Id;
      console.log(input)
      quoteModel.deleteOne({ _id: input })
        .then(
          result => {
            //console.log("One Record Deleted");
          },
          err => { res.send(err.message); })
        .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })
}

module.exports = { deleteOneQuote }