const exp = require("express")
const modeloProducto = require('./src/models/producto.model')

const app = exp();


app.set('view engine', 'ejs'); // Se Configura EJS como motor de plantillas

// Asegúrar de que las vistas se busquen en la carpeta correcta
app.set('views', __dirname + '/src/views');
app.use(exp.static(__dirname + '/src/public'));


app.get('/', (req, res) => {
  res.render('pages/pagina_principal'); // Renderiza las plantillas desde la carpeta 'views'
});

app.get('/productos', async(req, res)=>{
    let listaProducto = await modeloProducto.find({});
    console.log(listaProducto)
    if (listaProducto){
        res.json(listaProducto);
    }else{
        res.json({"Error": "Hubo un error"})
    }

})

app.post('/productos', async(req,res)=>{
    const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if (Insercion)
        res.status(200).json({"Mensaje": "Registo Exitoso"})
    else
        res.status(404).json({"Mensaje": "Se presento un Error"})
})


//callback
app.listen(7777,()=>{
    console.log('Servidor en linea, Puerto 7777')
});