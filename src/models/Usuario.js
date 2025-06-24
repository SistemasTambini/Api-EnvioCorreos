const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  documento: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Fecha_Creacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Fecha_Modificacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Estado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Jefe: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Area: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
