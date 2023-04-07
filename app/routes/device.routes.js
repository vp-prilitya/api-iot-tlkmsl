const deviceController = require("../controller/device.controller");
const router = require("express").Router();

router.get("/", deviceController.findAll);
router.post("/", deviceController.create);

module.exports = router;
