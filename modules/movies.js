const auth = require("./auth");
(mongo = require("../models/mongo")), (sql = require("../models/sql"));
const fetch = require("node-fetch");

//GET Petitions
exports.getDashBoard = async (req, res) => {
  if (req.role === "user") {
    res.status(200).render("dashboard", {
      title: "Dashboard",
      menu: true,
      admin: false,
    });
  } else {
    res.status(403).redirect("/movies");
  }
};

//? mngmongo.js READ
//! MongoDB
exports.getMovieDetails = async (req, res) => {
  if (req.role === "user") {
    if (req.params.title && req.params.title.startsWith('tt')){
      fetch(`http://www.omdbapi.com/?i=${req.params.title}&apiKey=${process.env.APIKEY}`)
      .then(res => res.json())
      .then( data =>  {
        console.log(data);
        res.status(200).render( 'movie',{
          menu: true,
          admin: false,
          status: "Film achieved!",
          data: data, // JSON.stringify(resulƒt)
      });
      });
    } else if (req.params.title){
        res.status(200).render( 'movie',{
          menu: true,
          admin: false,
          status: "Film achieved!",
          data: await mongo.getMovieById(req.params.title), // JSON.stringify(resulƒt)
      });
    }else{
      res.status(403).redirect("/search")
    }
    
  } else {
    res.status(403).redirect("/search");
  }
};
exports.getMovies = async (req, res) => {
  if (req.role == "admin") {
    //* Saca TODAS las peliculas de Mongo
    res.status(200).render("movies", {
      title: "Admin | My Movies",
      menu: true,
      admin: true,
      data: await mongo.readAllMovies(),
    }); //! render('movies', JSON de usuario)
  } else if (req.role == "user") {
    if (req.query.s) {
      await fetch(`http://www.omdbapi.com/?s=${req.query.s}&apiKey=${process.env.APIKEY}`)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.Search) {
            res.status(200).render("movies", {
              title: "Find",
              menu: true,
              admin: false,
              search: true,
              data: data,
            });
          } else {
            mongo.readAllMovies(req.query.s).then((data) => {
              if (data.length > 0) {
                console.log(data);
                res.status(200).render("movies", {
                  title: "My movies",
                  menu: true,
                  admin: false,
                  search: true,
                  data: data,
                });
              } else {
                res.status(200).render("movies", {
                  title: "My Movies",
                  menu: true,
                  admin: false,
                  search: true,
                  data: "We didn't find any movies :C",
                });
              }
            }).catch( err => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    } else {
      res.status(200).render("movies", {
        title: "Find",
        menu: true,
        admin: false,
        search: true,
      });
    }
  } //? ¿? - ('movies') o ('search')  - ¿Un pug para la lista de pelis del usuario y otro pug para todas las peliculas contenidas en la app?
};
exports.getMyMovies = async (req, res) => {
  if (req.role == "admin") {
    let data = await mongo.readAllMovies();
    res.status(200).render("movies", {
      title: "Admin | My Movies",
      menu: true,
      admin: true,
      data: data,
    }); //! render('movies', JSON de usuario)
  } else if (req.role == "user") {
    let urls = await sql.favorites(req.email);
    //*Iterar el Array
    let content = await urls.map(async (url) => {
      if (url.startsWith("http://www.omdbapi.com")) {
        return await fetch(`${url}&apiKey=${process.env.APIKEY}`)
          .then((resp) => resp.json())
          .then((data) => data);
      } else {
        return await mongo.getMovieById(url);
      }
    });
    let datos = await Promise.all(content).catch((err) => console.error(err));
    res.status(200).render("movies", { menu: true, admin: false, data: datos });
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
    res.status(200).clearCookie("aCookie").render("index", {
      menu: false,
    });
  } else if (req.cookies.gCookie) {
    res.status(200).clearCookie("gCookie").render("index", {
      menu: false,
    });
  } else {
    res.status(403).redirect("/login");
  }
};
//POST petitions:

// 1. exports.postLogIn
//? Validación de credenciales con algún tipo de redirecccion a auth.js - ¿?
// abrir sesión y redirección a /dashboard si es Usuario, o /movies si es Administrador:
exports.postFavorite = async (req, res) => {
  if (req.role == "user") {
    
    sql.postFavorite(req.email)

  }
};
exports.deleteFavorite = async (req, res) => {
  if (req.role == "user") {
    
    sql.deleteFavorite(req.email)

  }
};
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
exports.getCreateMovie = async (req, res) => {
  if (req.role === "admin") {
    res.status(200).render("movieAdmin", { menu: true, admin: true, method: "POST", action: "Crea", src:"movieAdmin" });
  } else {
    res.status(403).redirect("/");
  }
};
exports.getSettings = async (req, res) => {
  if (req.role === "admin") {
      let content = await mongo.getMovieById(req.params.id);

    res.status(200).render("movieAdmin", { menu: true, admin: true, method: "PUT", action:"Edita", src:"editMovie", "content": content });
  } else {
    res.status(403).redirect("/");
  }
};

exports.postNewMovie = async (req, res) => {
  console.log(req.body);
  result = await mongo.createMovie(req.body);
  res.status(200).render("movies");
};

//PUT petitions
// IDEA: quiero que cuando se realize este put la app se direccione a la vista de movieAdmin.pug en su formato de /editMovie

//! Mongomongo
//* mngmongo.js UPDATE
exports.putMovieDetails = async (req, res) => {
  let modification = await mongo.updateFilmDetails(req.params.id, req.body);
  res
    .status(200)
    .json({ status: "Film value/values updated", data: { modification } });
};

//! Mongodb
//* mngdb.js DELETE VALUE/VALUES FROM DOCUMENT
exports.deleteMovie = async (req, res) => {
  console.log(req.body.id);
  let valueElimination = await mongo.deleteFilm(req.params.id)
  res
    .status(200)
    .json({ status: "Film value/values deleted", data: { valueElimination } });
};
