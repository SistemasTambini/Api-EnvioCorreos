const { sendMail } = require('../services/mailService');

const handleSendEmail = async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const result = await sendMail(to, subject, html);

    if (result.success) {
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } else {
      res.status(500).json({ message: 'Error al enviar correo', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error inesperado', error });
  }
};

module.exports = { handleSendEmail };
