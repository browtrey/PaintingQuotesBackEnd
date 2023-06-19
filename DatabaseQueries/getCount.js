const { quoteModel } = require("../Models/quoteSchema")
const mongo = require('../Databases/mongo');
var num

const getCount = async function (req, res) {
  await mongo().then(async (db) => {

    try {
      quoteModel.find()
      .then(
        result => {
          //console.log(result.length)
          num = result.length
          //console.log('count: ' + num)
          res.send({num})
        },
        err => { res.send(err.message); })
      .catch(err => { console.log(err); });
    }
    catch (e) {
      res.json({ status: "input Fail", error: e })
    }

  })
}

module.exports = { getCount }