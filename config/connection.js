// IMPORTS
const Sequelize = require("sequelize");
require("dotenv").config();
// Variables
let sequelize;
// Initialize connection to database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false
    }
  )};
  // EXPORTS
  module.exports = sequelize;
