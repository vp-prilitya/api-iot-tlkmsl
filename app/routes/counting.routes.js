const countingController = require("../controller/counting.controller");
const router = require("express").Router();

router.get("/", countingController.findAll);
router.post("/", countingController.create);
router.get("/count", countingController.count);
router.get("/download", countingController.downloadCsv);
router.post("/reset", countingController.reset);

module.exports = router;
