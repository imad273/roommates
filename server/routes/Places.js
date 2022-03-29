const express = require('express');
const router = express.Router();

const places = require('../controllers/getPlaces');
const searchPlaces = require('../controllers/searchPlaces');


router.get('/places', places);
router.get('/search', searchPlaces);

module.exports = router;