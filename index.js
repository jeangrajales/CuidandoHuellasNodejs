const exp = require("express");
const modeloProducto = require("./src/models/producto.model");
const dbProducto = require("./src/data/producto.data");
const usuarioRoutes = require("./routes/router");


const app = exp();

// Middleware para procesar JSON y formularios
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

// Configurar motor de vistas y archivos estáticos
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.use(exp.static(__dirname + "/src/public"));

// Montar las rutas después de configurar middlewares
app.use(usuarioRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.render("pagina_principal");
});

// Ruta para obtener productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await dbProducto.getAllProductos();
    console.log("Productos obtenidos:", productos);
    res.render("productos", { productos });
  } catch (error) {
    console.error("Error cargando los productos:", error);
    res.status(500).send("Error cargando los productos");
  }
});

// Ruta para registrarse
app.get("/registrarse", (req, res) => {
    res.render("registrarse", { mensaje: null }); // Pasa la variable aunque esté vacía
});

app.get("/iniciar_sesion", (req, res) => {
    res.render("iniciar_sesion", { mensaje: null }); // Pasa la variable aunque esté vacía
});

app.get("/pagina_usuario", (req, res) => {
    res.render("pagina_usuario", { titulo: "Página del Usuario" });
});



// Iniciar servidor
app.listen(7777, () => {
  console.log("Servidor en línea, Puerto 7777");
});

