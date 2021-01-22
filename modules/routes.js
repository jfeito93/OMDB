const routes = require('express').Router();
const movies = require('./movies');

//GET Petitions
routes.get("/", movies.getHome);

module.exports = routes;