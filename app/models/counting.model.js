module.exports = (sequelize, Sequelize) => {
  const Counting = sequelize.define("countings", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_id: {
      type: Sequelize.STRING,
    },
  });
  return Counting;
};
