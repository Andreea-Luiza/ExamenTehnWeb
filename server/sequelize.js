const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('ExamenTW', 'postgres', 'stud', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.sync({ force: false }).then(() => {
  console.log("All models were synchronized succesfully");
});

module.exports = sequelize;
