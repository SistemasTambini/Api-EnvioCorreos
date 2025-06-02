const express = require('express');
const cors = require('cors');
const mailRoutes = require('./routes/mail.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', mailRoutes);

module.exports = app;
