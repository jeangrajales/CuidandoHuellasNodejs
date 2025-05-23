const modeloUsuario = require('../models/usuario.model');
const dbUsuario = require('../data/usuario.data')
const bcrypt = require("bcrypt");


exports.loginUser = async (req, res) => {
    const {correo, contraseña} = req.body;
    try{
        if (!correo || !contraseña) return res.render('iniciar_sesion', {error: "Ingrese todos los datos"});
        const user = await dbUsuario.findOneUser({correo: correo}, {correo: 1, contraseña: 1, rol: 1});
        if (!user) {
            return res.render('iniciar_sesion', { mensaje: "El usuario no existe" });
        } else{
            const passwordIsCorrect = await bcrypt.compare(contraseña, user.contraseña);
            if (!passwordIsCorrect) {
                return res.render('iniciar_sesion', { mensaje: "Contraseña Incorrectas"});
            } else {
                return res.cookie('user', user._id).redirect('/pagina_usuario')
            }
        }
    } catch (error) {
        console.error(error);
        return res.render('500', {
            error: error,
        });
    }
}

exports.logout = async (req, res) => {
    try{
        return res.clearCookie('user').redirect('/');
    } catch (error) {
        console.error(error);
        return res.render('500', {
            error: error,
        });
    }
}

exports.registerUser = async (req, res) => {
    try {
       
        const { nombre_completo, ciudad, telefono, correo, contraseña, confirmar_contraseña, rol } = req.body;
        const rolDefinido = rol || 1;

        if (!nombre_completo || !ciudad || !telefono || !correo || !contraseña || !confirmar_contraseña) {
            console.log("Faltan datos en el formulario.");
            return res.render("registrarse", { mensaje: "Todos los campos son obligatorios" });
        }

        if (contraseña !== confirmar_contraseña) {
            console.log("Las contraseñas no coinciden.");
            return res.render("registrarse", { mensaje: "Las contraseñas no coinciden" });
        }

        const usuarioExistente = await dbUsuario.findOneUser({ correo });
        if (usuarioExistente) {
            console.log("El usuario ya existe:", usuarioExistente);
            return res.render("registrarse", { mensaje: "El correo ya está registrado" });
        }

        console.log("Creando usuario...");
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = { nombre_completo, ciudad, telefono, correo, contraseña: contraseñaHash, rol: rolDefinido };
        await dbUsuario.createUserRecord(nuevoUsuario);
        
        console.log("Usuario registrado exitosamente!");
        return res.render("registrarse", { mensaje: "¡Registro exitoso! Ahora puedes iniciar sesión." });

    } catch (error) {
        console.error("Error en registro:", error);
        return res.render("registrarse", { mensaje: "Error interno al registrar usuario." });
    }
};



/* exports. recoverPassword = async (req, res) => {
    const {correo} = req.body;
} */