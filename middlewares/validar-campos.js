const { validationResult } = require('express-validator');


//Funcion
const validarCampos = (req, res, next) => {

    const errores = validationResult(req);

    //consulta
    if (!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    
    next();
}

module.exports = {
    validarCampos
}