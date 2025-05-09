const router = require('express').Router();
const productoController = require('../src/controller/producto.controller')
const controladorVendedor = require('../src/controller/vendedor.controller')
const usuarioController = require('../src/controller/usuario.controller')


// Catalogo

router.post('/productos', productoController.addProducto); 
router.get('/productos',productoController.getProductos)

// Login
router.get('/signin', usuarioController.renderSignInPage);


router.get('/vendedores',controladorVendedor.registrar)
router.get('/productos/registrar', controladorProductos.registrar);
router.get('/productos/editar/:id', controladorProductos.editar);
router.get('/productos/eliminar/:id', controladorProductos.eliminar);


module.exports= router