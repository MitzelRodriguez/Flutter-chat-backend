const { Schema, model } = require('mongoose');

//Modelo
const UsuarioSchema = Schema({
   
   nombre: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true, 
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   online: {
       type: Boolean,
       default: false
   },
});

//Metodo
UsuarioSchema.method('toJSON', function(){
   //...object == todo el resto de propiedades van a ser almacenadas ahi 
    const { __v, _id, password, ...object} = this.toObject(); 
    object.uid = _id //se le asigna nueva propiedad uid que va a ser igual al _id que se extrae
    return object;
});

//para poder exportarlo
module.exports = model('Usuario', UsuarioSchema);