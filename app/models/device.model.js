module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define("devices", {
    device_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  });
  return Device;
};
