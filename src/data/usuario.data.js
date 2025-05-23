const modeloUsuario = require('../models/usuario.model');

exports.findOneUser = async (filter, projection) =>{
    try {
        if (!projection) return await modeloUsuario.findOne(filter);
        else return await modeloUsuario.findOne(filter, projection);
    } catch (error){
        return error;
    }
};

exports.findAllUser = async (filter, projection) => {
    try{
        if (!filter) return await modeloUsuario.find({},projection);
        else if (!projection) return await modeloUsuario.find(filter);
        else return await modeloUsuario.find(filter, projection);
    } catch (error){
        return error;
    }
}

exports.createUserRecord = async (userInfo) => {
    try {
        const nuevoUsuario = new modeloUsuario(userInfo);
        return await nuevoUsuario.save();
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
};