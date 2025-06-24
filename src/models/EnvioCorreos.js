const { DataTypes } = require('sequelize');
const db = require('../config/db');

const EnvioCorreos = db.define('envio_correos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asunto: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  plantilla_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'plantillas',
      key: 'id'
    }
  },
  tipo_envio: {
    type: DataTypes.STRING(50), // 'individual' | 'masivo' | 'excel'
    allowNull: false
  },
  fecha_programada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // 0: Pendiente, 1: Enviado, 2: Error
  }
}, {
  timestamps: true
});

module.exports = EnvioCorreos;
