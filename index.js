const express = require('express');
const moviesRouter = require('./routes/movies.routes.js');
const connect = require('./utils/connect.js');
const cors = require('cors');
const cinemasRouter = require('./routes/cinemas.routes.js');

//Ejecuto la función para conectarme a la base de datos:
connect();
//Indico el puerto y creo el servidor:
const PORT = 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Manejo las solicitudes a las siguientes rutas diciendoles que vayan por sus respectivos routers:
server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);

server.use('*', (req, res, next) => {
    next(createError('Esta ruta no existe, 404'));
    
});

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error')
});

server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});