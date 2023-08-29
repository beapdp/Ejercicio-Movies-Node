Ejercicio Base de Datos Peliculas NODE

Este repositorio contiene la aplicación del módulo de Node.js del bootcamp de Full Stack. El proyecto permite gestionar una base de datos de cines y películas, con operaciones CRUD básicas.

Estructura del Proyecto
El proyecto tiene la siguiente estructura de carpetas:

models: Contiene los esquemas de Mongoose para cines (Cinemas.js) y películas (Movies.js).
routes: Contiene las rutas Express para manejar las peticiones HTTP relacionadas con cines (cinemas.routes.js) y películas (movies.routes.js).
utils: Contiene archivos de utilidades como la conexión a la base de datos (connect.js), manejo de errores personalizados (createError.js), y una semilla para inicializar la base de datos (movies.seed.js y movies.json).

Características Principales
CRUD completo para cines y películas.
Implementación de modelos de datos con Mongoose.
Utiliza Express para manejar las rutas y las peticiones HTTP.
Se incluye un script de inicialización para popular la base de datos con una lista de películas predefinidas.

Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose

Cómo empezar
1. Clona el repositorio.
2. Instala las dependencias.
   npm install
3. Inicia la aplicación.
  npm start

Modelos

Cinema
- name: Nombre del cine (String, requerido)
- location: Ubicación del cine (String, requerido)
- movies: Películas disponibles en el cine (Array de IDs de películas)

Movie
- title: Título de la película (String)
- director: Director de la película (String)
- year: Año de lanzamiento (Number)
- genre: Género de la película (String)

Rutas

Rutas de Cines
GET /: Lista todos los cines.
POST /: Crea un nuevo cine.
PUT /add-movie: Añade una película a un cine.
DELETE /:id: Elimina un cine.

Rutas de Películas
GET /: Lista todas las películas.
GET /:id: Obtiene una película por su ID.
POST /: Crea una nueva película.
DELETE /:id: Elimina una película.

Utilidades
connect.js: Conexión a la base de datos MongoDB.
createError.js: Función para crear errores personalizados.
movies.json: Semilla inicial para películas.
movies.seed.js: Script para inicializar la base de datos con las películas de movies.json.

