const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EnvioCumpleanosLog = sequelize.define('EnvioCumpleanosLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_envio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  estado_envio: {
    type: DataTypes.ENUM('ENVIADO', 'FALLIDO'),
    defaultValue: 'ENVIADO'
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'envio_cumpleanos_log',
  timestamps: false
});

module.exports = EnvioCumpleanosLog;
