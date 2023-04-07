module.exports = (sequelize, Sequelize) => {
  const History = sequelize.define("history", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_id: {
      type: Sequelize.STRING,
    },
  });
  return History;
};
