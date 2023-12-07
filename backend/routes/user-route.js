const express = require('express');
const user = require('../controllers/user-controller.js');

const router = express.Router();

router.post("/sendEmail", user.sendEmail);

module.exports = router;