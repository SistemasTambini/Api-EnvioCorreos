const { enviarCorreosCumpleaños } = require('../services/birthdayService');

const handleEnviarCumpleanios = async (req, res) => {
  try {
    const resultado = await enviarCorreosCumpleaños();
    res.status(200).json({
      message: 'Proceso de cumpleaños ejecutado',
      ...resultado
    });
  } catch (err) {
    console.error('❌ Error en controller de cumpleaños:', err);
    res.status(500).json({ message: 'Error al procesar cumpleaños', error: err });
  }
};

module.exports = { handleEnviarCumpleanios };
