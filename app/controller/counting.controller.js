const db = require("../models");
const Counting = db.counting;
const Device = db.device;
const History = db.history;
const Sequelize = require("sequelize");
const helper = require("../utils/helper");
const moment = require("moment");
const Op = Sequelize.Op;
var Json2csvParser = require("json2csv").Parser;

const findAll = async (req, res) => {
  const { from, to, deviceid, page, size } = req.query;
  let con = {};

  if (from && to) {
    con.createdAt = {
      [Op.between]: [from, to],
    };
  }

  if (deviceid) {
    con.device_id = deviceid;
  }

  const { limit, offset } = helper.getPagination(page - 1, size);

  try {
    const result = await Counting.findAndCountAll({
      limit: limit,
      offset: offset,
      where: con,
      distinct: true,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send({ data: result });
  } catch (err) {}
};

const create = async (req, res) => {
  const device = await Device.findByPk(req.body.deviceid);

  if (!device) {
    return res.status(404).send({ message: "device not found" });
  }

  try {
    await Counting.create({
      device_id: req.body.deviceid,
    });

    await History.create({
      device_id: req.body.deviceid,
    });

    res.status(201).send({ status: "success" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const count = async (req, res) => {
  const { from, to, deviceid } = req.query;
  let con = {};

  if (from && to) {
    con.createdAt = {
      [Op.between]: [from, to],
    };
  }

  if (deviceid) {
    con.device_id = deviceid;
  }

  try {
    const data = await Counting.count({
      where: con,
    });
    res.status(200).send({ data: data });
  } catch (err) {}
};

const downloadCsv = async (req, res) => {
  const { from, to, deviceid } = req.query;
  let con = {};

  if (from && to) {
    con.createdAt = {
      [Op.between]: [from, to],
    };
  }

  if (deviceid) {
    con.device_id = deviceid;
  }

  try {
    const result = await Counting.findAll({
      where: con,
      order: [["createdAt", "DESC"]],
      attributes: [
        ["device_id", "device"],
        ["createdAt", "date"],
      ],
      raw: true,
    });

    const csvFields = ["device_id", "createdAt"];
    const json2csvParser = new Json2csvParser({ csvFields });

    const db = result.map((value) => {
      return {
        ...value,
        date: moment(value.date).format("YYYY-MM-DD HH:ss:mm"),
      };
    });

    const csv = json2csvParser.parse(db);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=log.csv");

    res.status(200).end(csv);
  } catch (err) {}
};

const reset = async (req, res) => {
  const token = "telkomsel2023";

  if (token == req.body.token) {
    try {
      await Counting.destroy({
        truncate: true,
      });
      res.status(200).send({ message: "success" });
    } catch (err) {
      res.status(400).send({ message: "something wrong" });
    }
  } else {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = {
  findAll,
  create,
  count,
  downloadCsv,
  reset,
};
