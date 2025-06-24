const xlsx = require('xlsx');
const EnvioCorreo = require('../models/EnvioCorreo');
const TipoEnvio = require('../models/TipoEnvio');

const uploadExcel = async (req, res) => {
  try {
    const tipoId = parseInt(req.params.tipo_id);

    // Validar que el tipo exista
    const tipo = await TipoEnvio.findByPk(tipoId);
    if (!tipo) {
      return res.status(404).json({ message: 'El tipo de envío no existe.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo.' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const [headers, ...rows] = rawData;
    if (!headers || headers.length < 2) {
      return res.status(400).json({ message: 'El archivo debe tener columnas "nombre" y "correo".' });
    }

    const headerMap = headers.map(h => h?.toString().toLowerCase().trim());
    const nombreIdx = headerMap.indexOf('nombre');
    const correoIdx = headerMap.indexOf('correo');

    if (nombreIdx === -1 || correoIdx === -1) {
      return res.status(400).json({ message: 'Las columnas requeridas son "nombre" y "correo".' });
    }

    const data = rows.map(row => ({
      nombre: row[nombreIdx]?.toString().trim(),
      correo: row[correoIdx]?.toString().toLowerCase().trim(),
      estado: 1,
      updateFecha: new Date(),
      tipo_id: tipoId
    }));

    const validos = [];
    const errores = [];

    for (const d of data) {
      if (!d.correo || !d.nombre) {
        errores.push({ error: 'Falta nombre o correo', fila: d });
        continue;
      }

      const yaExiste = await EnvioCorreo.findOne({ where: { correo: d.correo, tipo_id: tipoId } });
      if (yaExiste) {
        errores.push({ error: 'Correo duplicado', correo: d.correo });
        continue;
      }

      validos.push(d);
    }

    await EnvioCorreo.bulkCreate(validos);

    res.json({
      message: 'Archivo procesado.',
      total: data.length,
      insertados: validos.length,
      errores: errores.length,
      detalles: errores
    });

  } catch (error) {
    console.error('❌ Error procesando el archivo Excel:', error);
    res.status(500).json({ message: 'Error al procesar el archivo Excel.' });
  }
};

module.exports = {
  uploadExcel
};
