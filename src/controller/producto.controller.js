const modeloProducto = require('../models/producto.model');
const dbProducto = require('../data/producto.data');

exports.addProducto = async (req, res) => {
    try {
        const ProductoIsRegistered = await dbProducto.findProducto({isbn: isbn});
        if (ProductoIsRegistered) {
            return res.status(400).json({error: 'Este producto ya se encuentra registrado'})
        }
        const producto = await dbProducto.createProductoRecord(req.body);
        return res.status(200).json({mensaje: 'Producto registrado con éxito'});
    } catch (error) {
        console.error(error);
        return res.render('500', {error: error, });
    }
};






































exports.consultar = async(req, res)=>{
    let listaProducto = await modeloProducto.find({});
    console.log(listaProducto)
    if (listaProducto){
        /* res.json(listaProducto); */
        res.render("pages/index",{listaProducto})
    }else{
        res.json({"Error": "Hubo un error"})
    }

}

exports.eliminar = async(req, res)=>{
    let listaProducto = await modeloProducto.find({});
    console.log(listaProducto)
    if (listaProducto){
        res.json(listaProducto);
    }else{
        res.json({"Error": "Hubo un error"})
    }

}

exports.registrar = async(req, res)=>{
    let listaProducto = await modeloProducto.find({});
    console.log(listaProducto)
    if (listaProducto){
        res.json(listaProducto);
    }else{
        res.json({"Error": "Hubo un error"})
    }

}

exports.editar = async(req, res)=>{}