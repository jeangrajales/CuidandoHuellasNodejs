const exp = require("express")
const modeloProducto = require('./src/models/producto.model')
const dbProducto = require('./src/data/producto.data');


const app = exp();


app.set('view engine', 'ejs'); // Se Configura EJS como motor de plantillas

// Asegúrar de que las vistas se busquen en la carpeta correcta
app.set('views', __dirname + '/src/views');
app.use(exp.static(__dirname + '/src/public'));

// Middleware para procesar JSON
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/pagina_principal'); // Renderiza las plantillas desde la carpeta 'views'
});


app.get('/productos', async (req, res) => {
    try {
        const productos = await dbProducto.getAllProductos();
        console.log("Productos obtenidos:", productos); // Verificar si hay datos
        res.render('pages/productos', { productos });
    } catch (error) {
        console.error("Error cargando los productos:", error); // Muestra el error exacto en la consola
        res.status(500).send("Error cargando los productos");
    }
});


//callback
app.listen(7777,()=>{
    console.log('Servidor en linea, Puerto 7777')
});