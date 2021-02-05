const movies = require("./movies"),
  express = require("express"),
  routes = express.Router();

// Public GET Petitions
//* Pública
routes.get("/login", movies.getLogIn); //* Llevar a la vista de control de la app
//Public POST Petitions
//! MongoDB
//*Pública
routes.post("/login", movies.postLogIn);
//* Inicio de sesion en la app

//Private GET Petitions
// Protegida (User)
routes.get("/", movies.claims, movies.getDashBoard);
//* Llevar a la vista inicial de la app

//Protegida (User y Admin)
routes.get("/search", movies.claims, movies.getMovies);
//* Búsqueda por título de pelicula existente en la app tanto para usuario como administrador

//Protegida (User)
//Llevar a la vista de detalles de la pelicula buscada
//Protegida (User)
routes.get("/search/:title", movies.claims, movies.getMovieDetails); //* Llevar a la vista de detalles de la pelicula buscada
//Protegida (User & Admin)
routes.get("/movies", movies.claims, movies.getMyMovies); //* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas
//Protegida (Both)
routes.get("/logout", movies.claims, movies.getLogOut); //* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas

// Private POST petitions
routes.post("/search/:id", movies.claims, movies.postFavorite);
routes.delete("/search/:id", movies.claims, movies.deleteFavorite);
//* Cierre de sesion en la app



routes.get('/settings', movies.claims, movies.getCreateMovie);

routes.get('/settings/:id', movies.claims, movies.getSettings);

routes.post('/settings', movies.claims, movies.postNewMovie);
//PUT petitions
//! MongoDB
//Protegida (Admin)
routes.put('/settings/:id', movies.putMovieDetails);
//* Edición de una pelicula y/o sus detalles ya existentes en la app

routes.delete('/settings/:id', movies.deleteMovie);

//DELETE petitions
//! MongoDB
//Protegida (Admin)

//* Eliminación de una pelicula y todo su contenido ya existente en la app


module.exports = routes;
