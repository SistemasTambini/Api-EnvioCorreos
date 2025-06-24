const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Plantilla = sequelize.define('Plantilla', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  plantilla: {
    type: DataTypes.TEXT('long'), // Soporta HTML completo y extenso
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'plantillas',
  timestamps: false
});

module.exports = Plantilla;
