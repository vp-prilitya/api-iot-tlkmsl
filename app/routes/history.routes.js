const historyController = require("../controller/history.controller");
const router = require("express").Router();

router.get("/", historyController.findAll);

module.exports = router;
