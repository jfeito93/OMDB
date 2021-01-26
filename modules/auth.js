const dotenv = require("dotenv"),
         jwt = require("jsonwebtoken"),
     express = require("express");

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// * Si el usuario ha hecho login con contraseña y usuario, usar JWT
//*Esta función se va a ejecutar en routes.js, en las rutas protegidas
exports.verifyJWT = (req, res, next) => {
  const token = req.query.t;
  //* El taquen se lo pasamos por la request, si falla,redirige a
  if (token) {
    //*verificamos el taquen con el secreto
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        next();
      }
    });
  } else {
    //*Si no eestas logado, vete a login mi amor
    res.redirect("/login");
  }
};
exports.signJWT = (req, res) => {
  //* El token se crea aquí
  // Encuentra un documento que tenga email: req body email, sacamela contraseñla === req.body.pw
  //dbo.FindOne({email: req.body.email}).pw === req.body.pw
  //Si la contraseña que nos han enviado coincide (ESTRICTO) con la contraseña que tiene asociada el usuario con el mail que noos has introducido
  if (req.body.email === "migueltafmart@gmail.com" && req.body.pw) {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: "14d",
    });
    res
      .json({
        mensaje: "Autenticación correcta",
        token: token,
      })
      .status(200);
  //*La cuenta no existe en la BD
  } else if ("algo"){
    res.json({ mensaje: "La cuenta no existe" });
  }else{
    res.json({ mensaje: "Contraseña incorrecta" });
  }

  //? Cookie parser
};
// * Si el usuario ha iniciado sesión con google, usar firebase.auth()
// TODO investigar como se usa firebase con node.js o si solo se puede usar en los scripts de /public
