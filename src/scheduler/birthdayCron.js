const cron = require('node-cron');
const { enviarCorreosCumpleanos } = require('../services/birthdayService');

// Ejecutar todos los días a las 16:15 hora Perú
cron.schedule('0 8 * * *', async () => {
  const now = new Date();
  console.log('🕓 Cron ejecutado. Hora del servidor:', now.toLocaleString('es-PE', { timeZone: 'America/Lima' }));

  try {
    const resultado = await enviarCorreosCumpleanos();

    if (resultado.enviados === 0) {
      console.log(`📭 No se enviaron correos. Motivo: ${resultado.mensaje || 'No hay cumpleañeros hoy.'}`);
    } else {
      console.log(`📨 Correos enviados: ${resultado.enviados}/${resultado.total}`);
    }

  } catch (error) {
    console.error('❌ Error en cron de cumpleaños:', error.message);
  }
}, {
  timezone: 'America/Lima'
});