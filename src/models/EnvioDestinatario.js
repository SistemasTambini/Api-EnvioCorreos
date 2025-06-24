const { DataTypes } = require('sequelize');
const db = require('../config/db');
const EnvioCorreo = require('./EnvioCorreos');

const EnvioDestinatario = db.define('envio_destinatarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  envio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'envio_correos',
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cc: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // 0: Pendiente, 1: Enviado, 2: Error
  },
  fecha_envio: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

EnvioCorreo.hasMany(EnvioDestinatario, { foreignKey: 'envio_id' });
EnvioDestinatario.belongsTo(EnvioCorreo, { foreignKey: 'envio_id' });

module.exports = EnvioDestinatario;
