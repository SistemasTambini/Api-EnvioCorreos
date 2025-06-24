const EnvioCorreo = require('../models/EnvioCorreo');
const TipoEnvio = require('../models/TipoEnvio');

async function getCorreosPorTipo(req, res) {
  const { tipo_id } = req.params;
  try {
    const correos = await EnvioCorreo.findAll({
      where: { tipo_id },
      order: [['nombre', 'ASC']]
    });
    res.json(correos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los correos.' });
  }
}

async function getTiposEnvio(req, res) {
  try {
    const tipos = await TipoEnvio.findAll({ order: [['nombre', 'ASC']] });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de envío.' });
  }
}

async function crearTipoEnvio(req, res) {
  const { nombre, descripcion } = req.body;

  try {
    // Verificar si ya existe
    const existente = await TipoEnvio.findOne({ where: { nombre } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un tipo de envío con ese nombre.' });
    }

    const nuevoTipo = await TipoEnvio.create({
      nombre,
      descripcion,
      estado: 1
    });

    res.status(201).json({
      message: 'Tipo de envío creado correctamente.',
      tipo: nuevoTipo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el tipo de envío.' });
  }
}

module.exports = {
  getCorreosPorTipo,
  getTiposEnvio,
  crearTipoEnvio
};
