const express = require('express');
const Movie = require('../models/Movies.js');
const createError = require('../utils/createError.js')

const moviesRouter = express.Router();

//Rutas relacionadas con la colección de películas, utilizo el modelo de película Movie para interactuar con la base de datos:

moviesRouter.get('/', async (req, res, next) =>{
    try{
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (err){
        next(err);
    }
});

//Solicitud GET: utilizando el método findById buscamos la película con el id especificado.
//Si se encuentra devuelvo una respuesta con el estado y el objeto encontrado.
//Si no se encuentra creo un error personalizado con esa función createError.
moviesRouter.get('/:id', async (req, res, next) =>{
    const id = req.params.id;
    try{
        const movie = await Movie.findById(id);
        if (movie){
             return res.status(200).json(movie);
        } else {
            next(createError('No existe una película con ese id', 404));
        }
    } catch (err){
        next(err);
    }
});

//Ruta por el título de la película.
moviesRouter.get('/title/:title', async (req, res, next) =>{
    //Obtengo ese título.
    const title = req.params.title;
    try{
        //A través del método find busco el título en la colección y enviamos una respuesta tanto si se encuentra como si da error:
        const movies = await Movie.find({title});
        if (movies){
             return res.status(200).json(movies);
        } else {
            return res.status(404).json('Esa película no se encuentra en la base de datos');
        }  
    } catch (err){
        next(err);
    }
});

//Ruta por el género de la película.
moviesRouter.get('/genre/:genre', async (req, res, next) =>{
    const genre = req.params.genre;
    try{
        const movies = await Movie.find({genre});
        if (movies){
             return res.status(200).json(movies);
        } else {
            return res.status(404).json('No se encuentra ese género de películas');
        }  
    } catch (err){
        next(err);
    }
});

//Ruta para las películas de a partir del 2010.
moviesRouter.get('/year/:year', async (req, res, next) =>{
    const year = req.params.year;
    try{
        const movies = await Movie.find({year: {$gte:2010}});
        if (movies){
             return res.status(200).json(movies);
        } else {
            return res.status(404).json('No se encuentra esa película');
        }  
    } catch (err){
        next(err);
    }
});

//Ruta por el director de la película.
moviesRouter.get('/director/:director', async (req, res, next) =>{
    const director = req.params.director;
    try{
        const movie = await Movie.find({director});
        if (movie){
             return res.status(200).json(movie);
        } else {
            return res.status(404).json('No tenemos películas con ese director en nuestra base de datos');
        }  
    } catch (err){
        next(err);
    }
});

//Ruta con el método POST en la ruta base.
//Creo una nueva instancia de Movie con los datos enviados en el cuerpo de la petición y la guardamos usando el método save().
moviesRouter.post('/', async (req, res, next) => {
    try {
        const newMovie = new Movie ({ ...req.body});
        const createMovie = await newMovie.save();
        return res.status(201).json(createMovie);
    } catch (err) {
        next(err);
    }
});

//Ruta de eliminación en la raíz, pasándole el id de la película, la busco y, si la encuentra se elimina a través de ese método findByIdAndDelete.
moviesRouter.delete('/:id', async ( req, res, next) => {
    try {
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('La película se ha eliminado correctamente');
    } catch (err) {
        next(err);
    }
});

//Ruta para actualizar una película existente, de nuevo con el id de la película.
moviesRouter.put(':id', async ( req, res, next ) => {
    try {
        const id = req.params.id;
        //Creo una n ueva instancia del modelo Movie utilizandoel cuerpo de la petición.
        //Le asignamos el valor de la id obtenida anteriormente.
        //Lo busco en mi base de datos y lo actualizamos con la información del objeto modifiedMovie.
        const modifiedMovie = new Movie({ ...req.body });
        modifiedMovie._id = id;
        const movieUpdated = await Movie.findByIdAndUpdate(
            id,
            modifiedMovie,
            { new: true }
        );
        return res.status(200).json(movieUpdated);
    } catch (err) {
        next(err);
    }
});

module.exports = moviesRouter;