const router = require('express').Router();

const { getLocais } = require("../controllers/materialController"); //require('../controllers/materialController');

router.post('/locais/', getLocais);

module.exports = router;

