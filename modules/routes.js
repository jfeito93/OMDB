const routes = require('express').Router();
const movies = require('./movies');

//GET Petitions
routes.get('/', movies.getHome); //* Llevar a la vista inicial de la app
routes.get('/dashboard', movies.getDashBoard); // ¿panel de control?
routes.get('/search', movies.getMovieTitle); //* Búsqueda por título de pelicula existente en la app
routes.get('/search/:title', movies.getMovieDetails); //* Llevar a la vista de detalles de la pelicula buscada
routes.get('/movies', movies.getMyMovies); //* Llevar a la lista personalizada del USUARIO de sus peliculas (pertenecientes a la app) guardadas

//POST petitions
routes.post('/login', movies.postLogIn); //* Inicio de sesion en la app
routes.post('/logout', movies.postLogOut); //* Cierre de sesion en la app
routes.post('/createMovie', movies.postNewMovie); //* Adición de una nueva pelicula a la app

//PUT petitions
routes.put('/editMovie/:id', movies.putMovieDetails); //* Edición de una pelicula ya existente en la app

//DELETE petitions
routes.delete('/removeMovie', movies.deleteMovie); //* Eliminación de una pelicula ya existente en la app

module.exports = routes;