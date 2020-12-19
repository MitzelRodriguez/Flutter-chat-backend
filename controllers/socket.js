//Importar models
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async(uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async(uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

//Grabar mensaje en la BD
const grabarMensaje = async( payload ) => {
     try {
         const mensaje = new Mensaje(payload);

         await mensaje.save();//guardar en la  BD

         return true;
     } catch (error) {
         return false;
     }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}