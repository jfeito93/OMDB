const movies = require("./movies"),
  express = require("express"),
  routes = express.Router();

// Public GET Petitions
//* Pública
routes.get("/login", movies.getLogIn);
//* Llevar a la vista de control de la app

//Public POST Petitions
//! MongoDB
//*Pública
routes.post("/login", movies.postLogIn);
//* Inicio de sesion en la app

//Private GET Petitions
// Protegida (User)
// routes.get("/", movies.claims, movies.getDashBoard);
//* Llevar a la vista inicial de la app

//Protegida (User y Admin)
// routes.get("/search", movies.claims, movies.getMovies);
//* Búsqueda por título de pelicula existente en la app tanto para usuario como administrador

//Protegida (User)
routes.get("/search/:title", movies.getMovieDetails);
//* Llevar a la vista de detalles de la pelicula buscada

//Protegida (User)
// routes.get("/movies", /* movies.claims, */ movies.getMyMovies);
//* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas

//Protegida (User y Admin)
// routes.get("/logout", movies.claims, movies.getLogOut);
//* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas


// Private POST petitions

// Protegida (User y Admin)
//routes.post('/logout', movies.postLogOut);
//* Cierre de sesion en la app

//! Protegida (Admin)
routes.post('/createMovie', movies.postNewMovie);
//* Adición de una nueva pelicula a la app


//PUT petitions
//! MongoDB
//Protegida (Admin)
/* routes.put('/editMovie/:id', movies.putMovieDetails); */
//* Edición de una pelicula y/o sus detalles ya existentes en la app


//DELETE petitions
//! MongoDB
//Protegida (Admin)
//routes.delete('/removeMovie', movies.deleteMovie);
//* Eliminación de una pelicula y todo su contenido ya existente en la app


module.exports = routes;
