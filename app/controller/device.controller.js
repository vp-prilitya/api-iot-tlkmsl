const db = require("../models");
const Device = db.device;

const findAll = async (req, res) => {
  try {
    const result = await Device.findAll();
    res.status(200).send({ data: result });
  } catch (err) {}
};

const create = async (req, res) => {
  try {
    const result = await Device.create({
      device_id: req.body.deviceid,
    });
    res.status(201).send({ status: result });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = {
  findAll,
  create,
};
