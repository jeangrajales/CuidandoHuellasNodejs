const exp = require("express")
require('dotenv').config()

const app = exp();

//callback
app.listen(7777,()=>{
    console.log('Servidor en linea, Puerto 7777')
});