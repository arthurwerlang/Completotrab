//O código define uma rota POST para buscar locais de descarte com `getLocais`.');


const router = require('express').Router();

const { getLocais } = require("../controllers/materialController");

router.post('/locais/', getLocais);

module.exports = router;

