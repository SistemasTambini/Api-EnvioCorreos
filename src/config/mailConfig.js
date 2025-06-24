const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  pool: true,                 // Habilita conexión en pool
  maxConnections: 5,          // Ajusta según tu SMTP
  maxMessages: 100,
  rateLimit: 10,              // Opcional: evita saturar el servidor SMTP
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,              // true si usas puerto 465 (SSL), false si usas 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // útil si hay problemas con certificados
  },
  // 🔧 Añade estos timeouts para evitar error ETIMEDOUT
  connectionTimeout: 20000,  // tiempo máximo para conectarse (en ms)
  greetingTimeout: 10000,    // tiempo máximo para esperar EHLO
  socketTimeout: 20000       // tiempo máximo para enviar/recibir datos
});

module.exports = transporter;
