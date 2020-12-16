//JasonWebToken, constan de tres partes: Header, Payload y Firma

const jwt = require('jsonwebtoken');

//se necesita recibir el uid del usuario
const generarJWT = (uid) => {
     
    return new Promise( ( resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:'12h' //tiempo de expiracion del token
        },
        //callback que se dispara con un error si sucede o un token si todo sale bien
        (err, token) => {

            if(err){
                //no se pudo crear el token 
                reject('No se pudo generar el token');
            }else{
                //Token
                resolve( token );
            }
        })
    });
}


const comprobarJWT = (token = '') => {
      //validar si existe 
      try {
        //extraer el uid que viene en el payload del token
         const {uid} = jwt.verify( token, process.env.JWT_KEY); 
         return [true, uid];
    } catch (error) {
         return [false, null];
    }
} 

//Exportacion por nombre entre llaves
module.exports = {
    generarJWT,
    comprobarJWT
}