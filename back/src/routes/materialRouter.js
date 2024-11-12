//O código define uma rota POST para buscar locais de descarte com `getLocais`.');


const router = require('express').Router();

const { getLocais } = require("../controllers/materialController");

/**
 * @swagger
 * /locais/:
 *  post:
 *    summary: Busca os endereços na api
 *    responses:
 *      201:
 *        description: Select nos endereços
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/locais/', getLocais);

module.exports = router;

