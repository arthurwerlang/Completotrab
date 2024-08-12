const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.get('/locais/:material', materialController.getLocaisByMaterial);

module.exports = router;
