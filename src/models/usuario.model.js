const mongoose = require("../config/connection");

const schemaUsuario = new mongoose.Schema({
    nombre_completo: {
        type: String,
        maxlength: 100,
        required: [true, "Nombre completo obligatorio"]
    },
    ciudad: {
        type: String,
        maxlength: 100,
        required: true
    },
    telefono: {
        type: Number,
        required: [true,"El numero de telefono es obligatorio"],
        min: 0 // 
    },
    correo: {
        type: String,
        maxlength: 254,
        match: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ ,
        required: [true,"Correo electronico obligatorio"]
    },
    contraseña: {
        type: String,
        maxlength: 254,
        required: [true, "La contraseña es obligatorio"]
    },
    rol: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    }
    });
  
  const modeloUsuario = mongoose.model("Usuario", schemaUsuario);
  module.exports = modeloUsuario;