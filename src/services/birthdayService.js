const Usuario = require('../models/Usuario');
const EnvioCumpleanosLog = require('../models/EnvioCumpleanosLog');
const { sendMail } = require('./mailService');
const sequelize = require('../config/db');
const { Op } = require('sequelize');
const { plantillaCumpleTipo1, plantillaCumpleTipo2 } = require('../utils/Plantillas.js');
const correosCumpleanos = require('../constants/correosCumpleanos.js');

async function enviarCorreosCumpleanos() {
  try {
    const hoy = new Date();

    const cumpleaneros = await Usuario.findAll({
      where: {
        estado: 1,
        correo: { [Op.ne]: null },
        [Op.and]: sequelize.where(
          sequelize.fn('DATE_FORMAT', sequelize.col('fecha_nacimiento'), '%m-%d'),
          '=',
          sequelize.fn('DATE_FORMAT', sequelize.fn('CURDATE'), '%m-%d')
        )
      },
      attributes: ['id', 'nombre', 'apellido', 'correo']
    });

    if (cumpleaneros.length === 0) {
      console.log('📭 No hay cumpleañeros hoy.');
      return { enviados: 0, mensaje: 'No hay cumpleañeros hoy.' };
    }

    let enviados = 0;

    for (const usuario of cumpleaneros) {
      if (!usuario.correo) continue;

      const yaEnviado = await EnvioCumpleanosLog.findOne({
        where: {
          id_usuario: usuario.id,
          [Op.and]: sequelize.where(
            sequelize.fn('DATE', sequelize.col('fecha_envio')),
            '=',
            sequelize.fn('CURDATE')
          ),
          estado_envio: 'ENVIADO'
        }
      });

      if (yaEnviado) {
        console.log(`⚠️ Ya se envió correo a ${usuario.nombre} ${usuario.apellido}`);
        continue;
      }

      const html = plantillaCumpleTipo1(usuario.nombre, usuario.apellido); // o tipo 2

      const result = await sendMail(
        usuario.correo,
        '🎉 ¡Feliz cumpleaños te desea Notaría Tambini! 🎂',
        html,
        correosCumpleanos
      );

      await EnvioCumpleanosLog.create({
        id_usuario: usuario.id,
        fecha_envio: hoy,
        estado_envio: result.success ? 'ENVIADO' : 'FALLIDO',
        mensaje: result.success ? null : (result.error?.toString() || 'Error desconocido')
      });

      if (result.success) enviados++;
    }

    console.log(`📨 Correos enviados: ${enviados}/${cumpleaneros.length}`);
    return { enviados, total: cumpleaneros.length };
  } catch (error) {
    console.error('❌ Error en el envío de correos de cumpleaños:', error);
    throw error;
  }
}

module.exports = { enviarCorreosCumpleanos };
