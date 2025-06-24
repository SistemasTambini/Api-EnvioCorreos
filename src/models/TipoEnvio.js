const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoEnvio = sequelize.define('TipoEnvio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'tipo_envio',
  timestamps: false
});

module.exports = TipoEnvio;
