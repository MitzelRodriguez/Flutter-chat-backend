const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

//Funcion crear usuario
const crearUsuario = async (req, res = response) => {

    //extraer informacion del request
    const { email, password } = req.body;

    //confirmar si existe en la BD
    try {

        //validacion correo existente
        const existeEmail = await Usuario.findOne({ email}); 

        if( existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            });
        }

        //nueva instancia del modelo
        const usuario = new Usuario(req.body);

        
        //salt genera un numero aleatorio
        const salt = bcrypt.genSaltSync();

        //encriptar password
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        //JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario, 
            token
        });
            
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

//Loguear Usuario
const loginUsuario = async ( req, res = response) => {

    //extraer informacion del request
     const { email, password } = req.body;
    
    try {

        const usuarioDB = await Usuario.findOne({email});

        //verificar si existe el usuario
        if( !usuarioDB ){
            //no existe usuario
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

        //Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if( !validPassword){
            //password incorrecto
            return res.status(404).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }

        //Todo OK, generar JWT
        const token  = await generarJWT(usuarioDB.id);
        
        //loginExitoso
        res.json({
            ok: true,
            usuario: usuarioDB, 
            token
        }); 
 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No se pudo hacer login'
        });
    }
}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const newToken = await generarJWT(uid);

    const userUid = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario: userUid,
        uid: uid,
        newtoken: newToken
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}