//VALIDAR token

const jwt = require('jsonwebtoken');

//Funcion para validar el token 
const validarJWT = (req, res, next) => {

    //Leer token 
    const token = req.header('x-token');

    //token nulo 
    if( !token){
        res.status('401').json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
    }

    //validar si existe 
    try {
     
        //extraer el uid que viene en el payload del token
         const {uid} = jwt.verify( token, process.env.JWT_KEY);

         //asignar uid extraido al uid del req
         req.uid = uid;
        
        next();
    } catch (error) {
        //Token no valido 
        res.status('401').json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}  


module.exports = {
    validarJWT
}