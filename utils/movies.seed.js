//Creo la seed encargada de inicializar la base de datos:
//Con mongoose me conecto a la base de datos MongoDb.
const mongoose = require('mongoose');
//Mi modelo para interactuar con la base de datos de películas:
const Movie = require('../models/Movies.js');
const fs = require('fs');

//Me conecto a mi base de datos:
const DB_URL = "mongodb+srv://root:6QhqbiFG35XApnuc@movies.gjzkgtq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //Tras conectarme a la base de datos le decimos que busque todas las películas que hay en ella y si las hay utilizando el método drop las borro:
}).then(async () =>{
    const allMovies = await Movie.find();
    if(allMovies.length){
        await Movie.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos:${err}`);
}) //Utilizo la función then aquí para, después de borrar todas las películas, leer el archivo JSON, parsearlo y crear documentos de películas en la base de datos:
.then(async() => {
    const data = fs.readFileSync('./utils/movies.json');
    const parsedData = JSON.parse(data);
    const movieDocs = parsedData.map((movie) =>{
        return new Movie(movie);
    });
    await Movie.insertMany(movieDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
});
