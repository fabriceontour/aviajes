//Importacion de express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Importacion de la rutas y de una config
const routes = require('./routes');
const configs = require('./config/index');
require('./config/config');
require('dotenv').config({path: 'variables.env'})

// Express
const app = express();

//Pug
app.set('view engine', 'pug');

//Las vistas
app.set('views', path.join(__dirname, './views'));

const config = configs[app.get('env')];
app.locals.titulo = 'Agencias de Viajes';

app.use(express.static('public'));

//Ese es un Middleware. next permite de seguir normalmente
app.use( (req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path
    return next();
})
//Ejecucion del bodyParser
app.use('/', bodyParser.urlencoded({extended: true}));

//Carge la rutas
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`Server arrancado en el port ${port}`)
});
