const routes = require("./modules/routes");
const express = require("express");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const HOST = "localhost";
const PORT = "3000";

//Middleware
dotenv.config();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // ¿? - dudo de su necesidad por no saber bien si sería necesario su uso //! Sustituye a body-parser
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(routes);

// TODO Error Handling

// 401
/* app.use(
  express.jwt({
    fail: function (req, res, next) {
      if (!req.headers.authorization)
        res.send(400, "missing authorization header");
      res.send(401);
    },
  })
);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.send(401, "invalid token...");
  }2
}); */

// 401 FUNCIONA SOLO, NO CONSIGO MEZCLAR TRES ERRORES 401, 403, 404
/* app.use(function (req, res, next) {
  return res.status(401).render("errors", {
    title: "error",
    num: "401",
    message: "Sorry, the data you passed us is incorrect.",
  });
}); */
// 403 FUNCIONA SOLO, NO CONSIGO MEZCLAR TRES ERRORES 401, 403, 404
/* app.use(function (req, res, next) {
  return res
    .status(403)
    .render("errors", {
      title: "error",
      num: "403",
      message: "Sorry, you cannot access this page.",
    });
}); */

// 404 FUNCIONA SOLO, NO CONSIGO MEZCLAR TRES ERRORES 401, 403, 404
app.use(function (req, res, next) {
  return res
    .status(404)
    .render("errors", {
      title: "error",
      num: "404",
      message: "Sorry, this is not the page you are looking for.",
      menu: true,
      admin: false,
    });
});

// 500 - Any server error
/* app.use(function (err, req, res, next) {
  return res.status(500).send({ message: "Route" + req.url + " Not found." });
}); */

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
