const express = require('express');
import * as user from '../controllers/user.js';

const router = express.Router();

router.post("/sendEmail", user.sendEmail);

export default router;