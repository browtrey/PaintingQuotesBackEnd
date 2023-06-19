const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');

const deleteAllQuotes = async function (res) {
  await mongo().then(async (db) => {

    try {
      quoteModel.deleteMany()
      .then(
        result => {
          //console.log("All deleted");
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })
}

module.exports = { deleteAllQuotes }