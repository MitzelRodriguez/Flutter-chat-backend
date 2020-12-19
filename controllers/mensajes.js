//Funcion que retorna todos los mensajes 

//Models
const Mensaje = require('../models/mensaje');

const obtenerChat = async(req, res) => {

    //Obtener mi id
    const miId = req.uid;
    const mensajesDe = req.params.de;

    //Obtener los ultimos 30 mensajes 
     const last30 = await Mensaje.find({
         //Condicion
         $or: [{de: miId, para: mensajesDe}, {de: mensajesDe, para: miId}]
     })
     .sort({createdAt: 'desc'}) //Ordenarlos de manera descendente
     .limit(30);//ultimos 30 mensajes

    res.json({
        ok: true,
        mensajes: last30
    })
}

module.exports = {
    obtenerChat
}