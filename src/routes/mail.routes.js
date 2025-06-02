const express = require('express');
const router = express.Router();
const { handleSendEmail } = require('../controllers/mail.controller');

router.post('/send-email', handleSendEmail);

module.exports = router;
