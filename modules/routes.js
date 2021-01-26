const movies = require('./movies'),
        auth = require('./auth');
const routes = require('express').Router();


// Public GET Petitions
//* Pública
routes.get('/login', movies.getLogIn); //* Llevar a la vista de control de la app

//Public POST Petitions
//*Pública
routes.post('/login', movies.postLogIn); //* Inicio de sesion en la app

//Private GET Petitions
//! Protegida (User)
routes.get('/', auth.verifyJWT, movies.getDashBoard); //* Llevar a la vista inicial de la app
//!Protegida (User)
routes.get('/search', auth.verifyJWT, movies.getMovies); //* Búsqueda por título de pelicula existente en la app
//!Protegida (User)
routes.get('/search/:title', auth.verifyJWT, movies.getMovieDetails); //* Llevar a la vista de detalles de la pelicula buscada
//!Protegida (User y Admin)
routes.get('/movies', movies.getMyMovies); //* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas 
//!Protegida (User y Admin)
routes.get('/logout', movies.getLogOut); //* Llevar a la lista personalizada del USUARIO de sus peliculas guardadas 
// Private POST petitions
//! Protegida (User y Admin)
//routes.post('/logout', movies.postLogOut); //* Cierre de sesion en la app
//! Protegida (Admin)
//routes.post('/createMovie', movies.postNewMovie); //* Adición de una nueva pelicula a la app

//PUT petitions
//! Protegida (Admin)
//routes.put('/editMovie/:id', movies.putMovieDetails); //* Edición de una pelicula ya existente en la app

//DELETE petitions
//! Protegida (Admin)
//routes.delete('/removeMovie', movies.deleteMovie); //* Eliminación de una pelicula ya existente en la app

module.exports = routes;