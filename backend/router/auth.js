/*
    path: api/login
*/

const { Router} = require('express');
const { validarNit,ListarNits , ValidarTarjeta } = require('../controllers.js/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//Login con tres argumentos el argumento de enmedio funciona como middleware
router.post('/validar-nit',[
    check('nit',"El numero de Nit es Obligatorio").not().isEmpty(),
    validarCampos
],validarNit)

router.post('/validar-tarjeta',[
    check('tarjeta',"El numero de Tarjeta es Obligatorio").not().isEmpty(),
    validarCampos
], ValidarTarjeta)


router.get('/nit-validados',ListarNits )




module.exports = router;