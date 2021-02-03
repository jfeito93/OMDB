const auth = require("./auth");
(mongo = require("../models/mongo")), (sql = require("../models/sql"));
const fetch = require("node-fetch");

//GET Petitions
exports.getDashBoard = async (req, res) => {
  if (req.role === "user") {
    res.status(200).render("dashboard", { menu: true, admin: false });
  } else {
    res.status(403).redirect("/movies");
  }
};

//? mngmongo.js READ
//! MongoDB
exports.getAllMovies = async (req, res) => {
  let lectura = await mongo.readAllMovies(req.params.title);
  res.status(200).json({ status: "Film details achieved!", data: { lectura } });
  if (req.role === "user") {
    console.log(req.params.title);
    let result = await mongo.readAllMovies(req.params.title);
    res.status(200).json({
      status: "Film achieved!",
      data: result, // JSON.stringify(result)
      title: result.title,
    });
  } else {
    res.status(403).redirect("/movies");
  }
};
exports.getMovies = async (req, res) => {
  if (req.role == "admin") {
    //* Saca TODAS las peliculas de Mongo
    let data = await mongo.readAllMovies();
    res.status(200).render("movies", {
      title: "Admin",
      menu: true,
      admin: true,
      "data": data
    }); //! render('movies', JSON de usuario)
  } else if (req.role == "user") {
    //* Haz un fetch a la API http://www.omdbapi.com/?s=${req.params.title}
    //*Cuando lo tengas mira
    //? El JSON trae un array de resultados?
    //* LLena content
    //? ELSE IF Si no, un GET a Mongo
    mongo.getAllMovies(req.params.title);
    //*LLenar content
    //? ELSE
    //* content = "No se han encontrado peliculas"
    res.status(200).render("movies", {
      title: "User",
      menu: true,
      admin: false,
    }); //! render('movies', JSON de admin)
  } //? ¿? - ('movies') o ('search')  - ¿Un pug para la lista de pelis del usuario y otro pug para todas las peliculas contenidas en la app?
};
exports.getMyMovies = async (req, res) => {
  if (req.role == "admin") {
    res.status(200).render("movies", {
      title: "Admin",
      menu: true,
      admin: true,
    }); //! render('movies', JSON de usuario)
  } else if (req.role == "user") {
    //* Array con las URL a cada sitio
    let urls = await sql.favorites(req.email);
    console.log(urls);
    //*Iterar el Array
    let content = await urls.map((url) => {
      if (url.startsWith("http://www.omdbapi.com")) {
        return fetch(`${url}&apiKey=${process.env.APIKEY}`).then((res) =>
          res.json()
        );
      } else {
        return mongo.readFilmDetails(url);
      }
    });
    res.json(await content[2]);
    //Si es de mongo hacer peticiones a Mongo
    // Si es de la APi, hacer peticiones a la api
    //* Lanzar peticiones a Mongo y a la API
    /*  res.status(200).render('movies', {
      title: 'User',
      menu: true,
      admin: false,
      content: await content
    }); //! render('movies', JSON de admin) */
  }
  //? ¿? - ('movies') o ('search') - ¿Un pug para la lista de pelis del usuario y otro pug para todas las peliculas contenidas en la app?
};
exports.getLogIn = (req, res) => {
  if (req.cookies.aCookie || req.cookies.gCookie) {
    res.status(403).redirect("/");
  } else {
    res.status(200).render("login", {
      menu: false,
    });
  }
};
exports.getLogOut = (req, res) => {
  if (req.cookies.aCookie) {
    res.status(200).clearCookie("aCookie").render("index", { menu: false });
  } else if (req.cookies.gCookie) {
    res.status(200).clearCookie("gCookie").render("index", { menu: false });
  } else {
    res.status(403).redirect("/login");
  }
};
//POST petitions:

// 1. exports.postLogIn
//? Validación de credenciales con algún tipo de redirecccion a auth.js - ¿?
// abrir sesión y redirección a /dashboard si es Usuario, o /movies si es Administrador:

// IDEA: quiero que al rellenar el formulario de la vista de login, si los datos introducidos coinciden con datos de user, la app se direccione a la vista de dashboard.pug y en caso de que esos datos coincidan con datos de admin, la app se direccione a la vista de movies.pug

// if logged render('dashboard') - if !== logged render('login')

exports.postLogIn = (req, res) => auth.signIn(req, res);

exports.claims = (req, res, next) => auth.checkToken(req, res, next);

// 2. exports.postLogOut
// Cierre de sesión y redirección a /

//? IDEA: quiero que cuando se realize este post la app se direccione a la vista de index.pug en su formato de /logout

/* exports.postLogOut = (req, res) => {
    res.status(200).render('index');
} */

// 3. exports.postNewMovie

//? IDEA: quiero que cuando se realize este post la app se direccione a la vista de movieAdmin.pug en su formato de /createMovie

//? mngdb.js CREATE
//! MongoDB
exports.getNewMovie = async (req, res) => {
  if (req.role === "admin") {
    res.status(200).render("/createMovie", { menu: true, admin: true });
  } else {
    res.status(403).redirect("/movies");
  }
};

exports.postNewMovie = async (req, res) => {
  console.log(req.body);
  let result = await mongo.createAdminMovie(req.body);
  res.status(200).render("/movies");
};

//PUT petitions
// IDEA: quiero que cuando se realize este put la app se direccione a la vista de movieAdmin.pug en su formato de /editMovie

//! MongoDB
//* mngdb.js UPDATE
exports.putMovieDetails = async (req, res) => {
  console.log(req.body.id);
  let modification = await mongo.updateFilmDetails(req.body.id);
  res
    .status(200)
    .json({ status: "Film value/values updated", data: { modification } });
};

//! MongoDB
//* mngdb.js DELETE VALUE/VALUES FROM DOCUMENT
exports.deleteMovieDetails = async (req, res) => {
  console.log(req.body.id);
  let valueElimination = await mongo.deleteFilmDetails(req.body.id);
  res
    .status(200)
    .json({ status: "Film value/values deleted", data: { valueElimination } });
};
