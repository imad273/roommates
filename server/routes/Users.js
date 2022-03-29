const express = require('express');
const router = express.Router();

const register = require('../controllers/register');
const login = require('../controllers/login');
const getProfile = require('../controllers/getProfile');

router.post('/regester', register);
router.post('/login', login);
router.get('/profile?:id', getProfile);

module.exports = router;