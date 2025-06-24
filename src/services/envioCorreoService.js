const EnvioCorreos = require('../../src/models/EnvioCorreos');
const EnvioDestinatario = require('../models/EnvioDestinatario');
const Plantilla = require('../models/Plantilla');
const EnvioCorreo = require('../models/EnvioCorreo'); // tabla con correos por tipo
const { sendMail } = require('./mailService');

function esCorreoValido(correo) {
  return typeof correo === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

async function crearEnvioCorreo({ asunto, contenido, plantilla_id, tipo_envio, destinatarios }) {
  let contenidoFinal = contenido;

  if (plantilla_id) {
    const plantilla = await Plantilla.findByPk(plantilla_id);
    if (!plantilla) throw new Error('Plantilla no encontrada');
    contenidoFinal = plantilla.plantilla;
  }

  const envio = await EnvioCorreos.create({
    asunto,
    contenido: contenidoFinal,
    plantilla_id,
    tipo_envio,
    fecha_programada: new Date(),
    estado: 0,
  });

  const registros = destinatarios.map(dest => ({
    envio_id: envio.id,
    nombre: dest.nombre,
    correo: dest.correo,
    cc: dest.cc || null,
    estado: 0,
  }));

  await EnvioDestinatario.bulkCreate(registros);
  return envio;
}

async function procesarEnvioCorreo(envioId) {
  const envio = await EnvioCorreos.findByPk(envioId);
  if (!envio) throw new Error('Envío no encontrado');

  const destinatarios = await EnvioDestinatario.findAll({ where: { envio_id: envioId, estado: 0 } });

  let enviados = 0;
  const errores = [];

  const resultados = await Promise.allSettled(destinatarios.map(async (dest) => {
    try {
      const result = await sendMail(dest.correo, envio.asunto, envio.contenido, dest.cc);
      if (result.success) {
        await dest.update({ estado: 1, fecha_envio: new Date() });
        enviados++;
        return true;
      } else {
        errores.push({ correo: dest.correo, error: result.error?.code || result.error?.message });
        return false;
      }
    } catch (err) {
      errores.push({ correo: dest.correo, error: err.code || err.message });
      return false;
    }
  }));

  await envio.update({ estado: 1 });

  return {
    enviados,
    total: destinatarios.length,
    fallidos: destinatarios.length - enviados,
    errores
  };
}

async function procesarEnvioPorGrupo({ tipo_id, asunto, contenido, plantilla_id, cc }) {
  let contenidoFinal = contenido;

  if (plantilla_id) {
    const plantilla = await Plantilla.findByPk(plantilla_id);
    if (!plantilla) throw new Error('Plantilla no encontrada');
    contenidoFinal = plantilla.plantilla;
  }

  const correosGrupo = await EnvioCorreo.findAll({
    where: { tipo_id },
    order: [['nombre', 'ASC']]
  });

  if (correosGrupo.length === 0) {
    throw new Error('No hay correos para este grupo.');
  }

  const validos = correosGrupo.filter(c => esCorreoValido(c.correo));
  const invalidos = correosGrupo.length - validos.length;

  if (validos.length === 0) {
    throw new Error('No hay correos válidos en este grupo.');
  }

  const envio = await EnvioCorreos.create({
    asunto,
    contenido: contenidoFinal,
    plantilla_id,
    tipo_envio: 'grupo',
    fecha_programada: new Date(),
    estado: 0,
  });

  const destinatarios = validos.map(correo => ({
    envio_id: envio.id,
    nombre: correo.nombre,
    correo: correo.correo,
    cc: cc || null,
    estado: 0,
  }));

  await EnvioDestinatario.bulkCreate(destinatarios);

  let enviados = 0;
  const errores = [];

  const resultados = await Promise.allSettled(destinatarios.map(async (dest) => {
    try {
      const result = await sendMail(dest.correo, envio.asunto, envio.contenido, dest.cc);
      if (result.success) {
        await EnvioDestinatario.update(
          { estado: 1, fecha_envio: new Date() },
          { where: { envio_id: envio.id, correo: dest.correo } }
        );
        enviados++;
        return true;
      } else {
        errores.push({ correo: dest.correo, error: result.error?.code || result.error?.message });
        return false;
      }
    } catch (err) {
      errores.push({ correo: dest.correo, error: err.code || err.message });
      return false;
    }
  }));

  await envio.update({ estado: 1 });

  return {
    total_obtenidos: correosGrupo.length,
    validos: validos.length,
    enviados,
    fallidos: validos.length - enviados,
    invalidos,
    errores
  };
}

module.exports = {
  crearEnvioCorreo,
  procesarEnvioCorreo,
  procesarEnvioPorGrupo
};
