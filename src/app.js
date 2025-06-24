const express = require('express');
const cors = require('cors');

// Rutas ya existentes
const mailRoutes = require('./routes/mail.routes');
const birthdayRoutes = require('./routes/birthday.routes');
const aniversarioRoutes = require('./routes/aniversario.routes');
const correoRoutes = require('./routes/correo.routes');
const uploadRoutes = require('./routes/upload.routes');
const plantillaRoutes = require('./routes/plantilla.routes');

// NUEVA ruta que debes agregar
const envioCorreoRoutes = require('./routes/envioCorreo.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas agrupadas bajo /api
app.use('/api', mailRoutes);
app.use('/api', birthdayRoutes);
app.use('/api', aniversarioRoutes);
app.use('/api', correoRoutes);
app.use('/api', uploadRoutes);

// Rutas específicas
app.use('/api/plantillas', plantillaRoutes);
app.use('/api/envios', envioCorreoRoutes); // ✅ nueva

module.exports = app;
