const transporter = require('../config/mailConfig');

async function sendMail(to, subject, html, cc = null) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: Array.isArray(to) ? to.join(', ') : to,
      cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
      subject,
      html,
    });

    console.log('📧 Correo enviado:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    return { success: false, error };
  }
}

module.exports = { sendMail };