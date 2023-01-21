const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:6QhqbiFG35XApnuc@movies.gjzkgtq.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

//Defino la función connect para conectarme a la base de datos.
const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connect;