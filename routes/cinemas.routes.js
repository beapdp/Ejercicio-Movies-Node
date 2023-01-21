const express = require('express');
const Cinema = require('../models/Cinemas.js');
const createError = require('../utils/createError.js');

const cinemasRouter = express.Router();

//Creo las diferentes rutas para mi colección de cines:
cinemasRouter.get('/', async (req, res, next) =>{
    try{
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    } catch (err){
        next(err);
    }
});

cinemasRouter.post('/', async ( req, res, next ) => {
    try {
        const newCinema = new Cinema({ ...req.body});
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.put('/add-movie', async ( req, res, next ) => {
    try {
        const { cinemaId, movieId } = req.body;
        if ( !cinemaId ){
            return next (createError('Se necesita un id del cine para porder añadir la película', 500));    
        }
        if ( !movieId ){
            return next (createError('Se necesita un id de la película para añadirla', 500 ))
        }
        const movieUpdated = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId }},
            { new: true }
        );
        return res.status(200).json(movieUpdated);
    } catch (err) {
        next(err);

    }
});

cinemasRouter.delete('/:id', async ( req, res, next) => {
    try {
        const id = req.params.id;
        await Cinema.findByIdAndDelete(id);
        return res.status(200).json('El cine se ha eliminado correctamente de la base de datos');
    } catch (err) {
        next(err);
    }
});

module.exports = cinemasRouter;