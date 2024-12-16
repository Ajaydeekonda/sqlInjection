const express = require('express');
const getUsers = require('../controllers/low.controller')

const router = express.Router();

router.post('/',getUsers);

module.exports = router;



