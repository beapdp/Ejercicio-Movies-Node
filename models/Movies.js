const mongoose = require('mongoose');

//Creo mi schema, mi plantilla para los ducumentos de la colección de películas:
const movieSchema = new mongoose.Schema(
    {
       title: String,
       director: String,
       year: Number,
       genre: String,
    },
    {
        timestamps: true
    }
);

//Creo mi modelo, lo utilizaré para crear documentos y realizar operaciones de CRUD:
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;