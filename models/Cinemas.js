const mongoose = require('mongoose');

//Creo mi schema, mi plantilla para los ducumentos de la colección de cines:
const cinemasSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}]
}, {
    timestamps: true
});

//Creo mi modelo, lo utilizaré para crear documentos y realizar operaciones de CRUD:

const Cinema = mongoose.model('Cinema', cinemasSchema);

module.exports = Cinema;