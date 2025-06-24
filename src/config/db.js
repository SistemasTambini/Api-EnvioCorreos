const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT, 10),
    logging: false,
    pool: {
      max: 10,        // Máximo de conexiones activas
      min: 0,         // Mínimo de conexiones abiertas
      acquire: 30000, // Tiempo máximo para obtener una conexión (ms)
      idle: 10000     // Tiempo antes de cerrar conexión inactiva (ms)
    }
  }
);


module.exports = sequelize;