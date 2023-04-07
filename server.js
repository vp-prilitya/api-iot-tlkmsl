const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const countingRoute = require("./app/routes/counting.routes");
const deviceRoute = require("./app/routes/device.routes");
const historyRoute = require("./app/routes/history.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("Api");
});

app.use("/api/counting", countingRoute);
app.use("/api/device", deviceRoute);
app.use("/api/history", historyRoute);

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port}!`)
);
