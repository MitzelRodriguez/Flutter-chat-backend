/* 
path: api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router  = Router();

//check('valor a checar', 'mensaje de error').Condiciones
router.post('/new',[ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'el correo no es valido').isEmail(),
    check('email', 'el correo es obligatorio').not().isEmpty(),
    check('password', 'el password esta vacio').not().isEmpty(),
    validarCampos
],crearUsuario);

//login
router.post('/',[
    check('email', 'Introduzca el email').not().isEmpty(),
    check('email', 'Introduzca un email valido').isEmail(),
    check('password', 'Introdusca una contrasena').not().isEmpty(),
], loginUsuario);


router.get('/renew', validarJWT, renewToken);

module.exports = router;