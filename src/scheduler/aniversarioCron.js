const cron = require('node-cron');
const { enviarCorreosAniversario } = require('../services/aniversarioService');

// Ejecutar todos los días a las 08:00 AM hora Perú
cron.schedule('0 8 * * *', async () => {
  const now = new Date();
  console.log('🕓 Cron ejecutado. Hora del servidor:', now.toLocaleString('es-PE', { timeZone: 'America/Lima' }));

  try {
    const resultado = await enviarCorreosAniversario();

    if (resultado.enviados === 0) {
      console.log('📭 No se encontraron correos pendientes.');
    } else {
      console.log(`✅ Correos enviados: ${resultado.enviados}/${resultado.total}`);
    }
  } catch (error) {
    console.error('❌ Error al ejecutar cron de aniversario:', error.message);
  }
}, {
  timezone: 'America/Lima'
});
