const { enviarCorreosAniversario } = require('../services/aniversarioService');

const handleEnvioAniversario = async (req, res) => {
  try {
    const resultado = await enviarCorreosAniversario();
    res.status(200).json({
      message: '✅ Envío de correos de aniversario completado.',
      ...resultado
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Error durante el envío', error: err.message });
  }
};

module.exports = { handleEnvioAniversario };
