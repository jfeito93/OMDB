//* Configuración de .env para mantener la Clave API oculta
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;
//* Fetch a la API de OMDB con todas las películas que contengan una palabra clave,
//* Devuelve el Array de JSON películas
// exports.filmswithKeyWord = keyword => {
     //*fetch con la palabra clave introducida en la URL
//   fetch(`http://http://www.omdbapi.com/?s=${keyword}&apiKey=${API_KEY}`)
//      .then(res => res.json())
//      .then(movies => {
//          return movies.Search;
//      })
//      .catch(err => console.error(err))
//}
//? Hace falta algún fetch a la API más?
//
//* Fetch a la dB a todas las peliculas favoritas
//*Devuelve Array de JSONS películas
//
//* Fetch a la dB por una película
//*Devuelve JSON película