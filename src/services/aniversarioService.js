const { sendMail } = require('./mailService');
const EnvioCorreo = require('../models/EnvioCorreo');

async function enviarCorreosAniversario() {
  try {
    const now = new Date();
    console.log('🕓 Hora local del servidor (America/Lima):', now.toLocaleString('es-PE', { timeZone: 'America/Lima' }));

    // Obtener correos con estado 0
    const destinatarios = await EnvioCorreo.findAll({ where: { estado: 0 } });

    console.log('✅ Lista seleccionada:', destinatarios.map(d => `${d.nombre} -> ${d.correo}`));
    console.log(`📋 Registros seleccionados (estado = 0): ${destinatarios.length}`);

    if (!destinatarios || destinatarios.length === 0) {
      console.log('📭 No hay correos pendientes de envío.');
      return { enviados: 0 };
    }

    let enviados = 0;

    for (const usuario of destinatarios) {
      if (!usuario.correo) {
        console.warn(`⚠️ Usuario sin correo: ID ${usuario.id}, Nombre: ${usuario.nombre}`);
        continue;
      }

      const html = generarPlantillaHTML(usuario.nombre);
      const subject = '🎉 ¡Celebramos 26 años contigo! 🎉';

      const result = await sendMail(usuario.correo, subject, html);

      if (result.success) {
        enviados++;
        console.log(`✅ Enviado a ${usuario.nombre} (${usuario.correo})`);

        // Actualizar estado a 1 y fecha
        await usuario.update({ estado: 1, updateFecha: new Date() });
      } else {
        console.error(`❌ Error al enviar a ${usuario.correo}:`, result.error);
      }
    }

    console.log(`📨 Correos enviados: ${enviados} de ${destinatarios.length}`);
    return { enviados, total: destinatarios.length };
  } catch (error) {
    console.error('❌ Error en el envío masivo:', error);
    throw error;
  }
}

function generarPlantillaHTML() {
  return `
    <html lang="es">
  <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.06);">
      
      <h2 style="color: #2a3b8f; margin-bottom: 10px;">🎉 ¡Hoy celebramos 26 años de confianza! 🎉</h2>
      
      <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
        En <strong>Notaría Tambini</strong> celebramos más que un aniversario.<br />
        Celebramos la historia que hemos construido contigo.
      </p>

      <p style="color: #555; font-size: 15px;">
        Gracias por ser parte de nuestra trayectoria. Tu confianza y lealtad nos han impulsado
        a mejorar cada día. ¡Este logro también es tuyo!
      </p>

      <img src="https://www.notariatambini.com/wp-content/uploads/2025/aniversario26.jpeg"
           alt="Aniversario 26 años Notaría Tambini"
           style="width: 100%; border-radius: 10px; margin-top: 20px;" />

      <p style="margin-top: 30px; font-size: 13px; color: #999;">
        Este es un mensaje automático. Por favor, no responder.
      </p>
    </div>
  </body>
</html>
  `;
}

module.exports = { enviarCorreosAniversario };
