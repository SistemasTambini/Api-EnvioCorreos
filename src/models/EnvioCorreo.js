const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EnvioCorreo = sequelize.define('EnvioCorreo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateFecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tipo_envio',
      key: 'id'
    }
  }
}, {
  tableName: 'enviocorreos',
  timestamps: false
});

module.exports = EnvioCorreo;
