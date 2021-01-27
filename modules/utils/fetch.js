//* Configuración de .env para mantener la Clave API oculta
const fetch = require('node-fetch');
const API_KEY = process.env.APIKEY;
//* Fetch a la API de OMDB con todas las películas que contengan una palabra clave,
//* Devuelve el Array de JSON películas
 exports.filmswithKeyWord = (req, res) => {
     //*fetch con la palabra clave introducida en la URL
let keyword = req.keyword;
 fetch(`http://www.omdbapi.com/?s=${keyword}&apiKey=${API_KEY}`)
      .then(res => res.json())
     .then(movies => {
          res.status(200).render('movies', {data:movies}); 
      })
      .catch(err => console.error(err))
}
//? Hace falta algún fetch a la API más?
//module.exports.fetch

//* GET a la dB a todas las peliculas favoritas
//*Devuelve Array de JSONS películas
//
//* GET a la dB por una película
//*Devuelve JSON película