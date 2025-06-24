// 📁 controllers/plantilla.controller.js
const Plantilla = require('../models/Plantilla');

exports.getAll = async (req, res) => {
  try {
    const plantillas = await Plantilla.findAll();
    res.json(plantillas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener plantillas' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, categoria, plantilla } = req.body;
    const nueva = await Plantilla.create({ nombre, categoria, plantilla });
    res.json({ message: 'Plantilla creada correctamente', plantilla: nueva });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear plantilla' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, plantilla, estado } = req.body;
    const plantillaExistente = await Plantilla.findByPk(id);
    if (!plantillaExistente) return res.status(404).json({ error: 'No encontrada' });
    await plantillaExistente.update({ nombre, categoria, plantilla, estado });
    res.json({ message: 'Plantilla actualizada', plantilla: plantillaExistente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar plantilla' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const plantilla = await Plantilla.findByPk(id);
    if (!plantilla) return res.status(404).json({ error: 'No encontrada' });
    await plantilla.destroy();
    res.json({ message: 'Plantilla eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar plantilla' });
  }
};