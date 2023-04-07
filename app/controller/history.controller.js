const db = require("../models");
const History = db.history;

const findAll = async (req, res) => {
  try {
    const result = await History.findAll();
    res.status(200).send({ data: result });
  } catch (err) {}
};

module.exports = {
  findAll,
};
