const Sequelize = require("sequelize");
const db = require("../db/connection");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  accountType: {
    type: Sequelize.STRING,
  },
  profileImage: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User