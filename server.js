require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');
require('./src/scheduler/birthdayCron'); // ⬅️ Ejecuta cron al iniciar
require('./src/scheduler/aniversarioCron');

const PORT = process.env.PORT || 3009;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos MySQL exitosa.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
})();
