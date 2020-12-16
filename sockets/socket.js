
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection',(client) => {
    
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    //Verificar autenticacion
    if(!valido){ return client.disconnect();}

    //Cliente Autenticado
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

});