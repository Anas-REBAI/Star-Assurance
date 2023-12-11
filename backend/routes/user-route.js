const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post("/sendEmail", userController.sendEmail);

module.exports = router;
