const auth = require("./auth");
db = require("../models/mngdb");

//GET Petitions
exports.getHome = (req, res) => {
  res.status(200).render("index");
};
exports.getDashBoard = (req, res) => {
  res.status(200).render("dashboard");
};

//? mngdb.js READ
//! MongoDB
exports.getMovieDetails = async (req, res) => {
  console.log(req.body.Title);
  let lectura = await db.readFilmDetails(req.body.Title);
  res.status(200).json({ status: "Film achieved!", data: { lectura } });
};

exports.getMovies = async (req, res) => {
  res.status(200).render("movies"); //? ¿? - ('movies') o ('search')  - ¿Un pug para la lista de pelis del usuario y otro pug para todas las peliculas contenidas en la app?
};
exports.getMyMovies = async (req, res) => {
    res.status(200).render('movies');
 //? ¿? - ('movies') o ('search') - ¿Un pug para la lista de pelis del usuario y otro pug para todas las peliculas contenidas en la app?
}; 
exports.getLogIn = (req,res) => {
  if(req.cookies.authcookie){
    res.status(403).redirect('/');
  }else{
    res.status(200).render('login');
  }
    
}
exports.getLogOut = (req,res) => {
    res.status(200)
    .clearCookie('authcookie')
    .render('index');
}
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

// IDEA: quiero que cuando se realize este post la app se direccione a la vista de index.pug en su formato de /logout

/* exports.postLogOut = (req, res) => {
    res.status(200).render('index');
} */

// 3. exports.postNewMovie

// IDEA: quiero que cuando se realize este post la app se direccione a la vista de movieAdmin.pug en su formato de /createMovie

//? mngdb.js CREATE
//! MongoDB
exports.postNewMovie = async (req, res) => {
  console.log(req.body);
  let result = await db.createAdminFilmList(req.body);
  res.status(200).json({
    status: "Film created!",
    data: { body: req.body },
    id: result,
  });
};

//PUT petitions

// 1. exports.putMovieDetails

// IDEA: quiero que cuando se realize este put la app se direccione a la vista de movieAdmin.pug en su formato de /editMovie

/* exports.putMovieDetails = async (req, res) => {
  console.log(req.body.id);
  let modification = await db.modFilmDetails(req.body.id);
  res
    .status(200)
    .json({ status: "Film ", data: { modification } });
}; */

//DELETE petitions

// 1. exports.deleteMovie

// IDEA: quiero que cuando se realize este delete la app se direccione a UNA POSIBLE vista de movieAdmin.pug/remove.pug(nueva) en su formato de /removeMovie.
// IDEA de remove.pug(nueva): vista con el tipico "¿esta seguro de que desea eliminar esta pelicula" - necesidad de ello o tiramos con el borrado acto seguido de accionar el boton de eliminar

/* exports.deleteMovie = (req, res) => {
    if (role == 'Admin') {
        return res.status(200).render('movieAdmin');
    }
} */

/* exports.deleteMovie = (req, res) => {
    if (role == 'Admin') {
        return res.status(200).render('remove');
    }
} */
