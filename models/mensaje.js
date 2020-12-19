const { Schema, model } = require('mongoose');

//Modelo
const MensajeSchema = Schema({
   
   de: {
       type: Schema.Types.ObjectId,
       ref:'Usuario',
       required: true
   },
   para: {
    type: Schema.Types.ObjectId,
    ref:'Usuario',
    required: true
   },
   mensaje: {
       type: String,
       required: true
   }
}, {
    timestamps:true
});

//Metodo
MensajeSchema.method('toJSON', function(){
   //...object == todo el resto de propiedades van a ser almacenadas ahi 
    const { __v, _id, ...object} = this.toObject(); 
    return object;
});

//para poder exportarlo
module.exports = model('Mensaje', MensajeSchema);