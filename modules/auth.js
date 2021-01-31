const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');
const serviceAccount = require("../config/config");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const users = [{
    email: "migueltafmart@gmail.com",
    pw: "1234",
    role: "admin",
  },
  {
    email: "javierfeito1993@gmail.com",
    pw: "4321",
    role: "admin",
  },
  {
    email: "silvialcastilla@gmail.com",
    pw: "0000",
    role: "user",
  },
  {
    email: "luciadeveloper@gmail.com",
    pw: "6969",
    role: "user",
  },
  {
    email: "mikkeperkinson@gmail.com",
    pw: "1234",
    role: "user",
  }
];


// * Si el usuario ha hecho login con contraseña y usuario, usar JWT
//*Esta función se va a ejecutar en routes.js, en las rutas protegidas
exports.checkToken = (req, res, next) => {
  //  console.log(req)
  if (req.cookies.aCookie) {
    //get authcookie from request
    const aCookie = req.cookies.aCookie;
    //verify token which is in cookie value
    jwt.verify(aCookie, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else{
        req.email = data.email;
        req.role = data.role;
        next();
      } 
    });
  } else if (req.cookies.gCookie) {
    const gCookie = req.cookies.gCookie;
    admin.auth()
      .verifySessionCookie(gCookie, true)
      .then((claims) => {
        admin.auth()
        .getUser(claims.uid)
        .then( user => {
          req.email = user.customClaims.email;
          req.role = user.customClaims.role;
          next();
        })
      }).catch(err => {
        res.sendStatus(403);
      })

  } else {
    res.redirect("/login");
  }
};
exports.signIn = async (req, res) => {
  //console.log(req.body.data);
  //*Busca y almacena el usuario en la base de datos
  // TODO QUERY a la BBDD SQL 

  //? Algo parecido a (`SELECT * FROM users WHERE email=${req.body.email}`)
  const user = await users.find((u) => u.email === req.body.data.email);
  //* Si el user existe en la base de datos y ha pasado contraseña correcta por el request
  if (user && (req.body.data.pw === user.pw)) {

    //TODO Login correcto, generar token con JWT y cookie de sesión
    const token = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.TOKEN_SECRET);
    res.cookie("aCookie", token, {
        maxAge: 900000,
        httpOnly: true
      })
      .status(200)
      .json({
        mensaje: "Logging correcto",
        status: true
      });
    //* Si el user existe en la base de datos y ha pasado una contraseña por el request
  } else if (user && req.body.data.pw) {
    //! Contraseña o usuario incorrectos
    res.status(401)
      .json({
        mensaje: "Contraseña o usuario incorrecto",
        status: false
      });
    //* Si el user existe en la base de datos y ha pasado el token id de google
  } else if (user && JSON.stringify(req.body.data.gToken)) {
    //TODO Login correcto, generar cookie de sesión con Firebase.auth()
    const gToken = await req.body.data.gToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
      .auth()
      .verifyIdToken(gToken)
      .then(decodedGToken => {
        let role = "user";
        if (user.role === "admin") {
          role = "admin";
        }
        admin.auth().setCustomUserClaims(decodedGToken.uid, {
            role: role,
            email: user.email
          })
          .then(() => {
            admin.auth().createSessionCookie(gToken, {
                expiresIn
              })
              .then(sessionCookie => {
                const options = {
                  MaxAge: expiresIn,
                  httpOnly: true
                };
                res.cookie("gCookie", sessionCookie, options, );
                res.status(200)
                  .json({
                    mensaje: "Logging correcto",
                    status: true
                  })
              }, ).catch((err => {
                res.status(401)
                  .json({
                    mensaje: "El token de Firebase es incorrecto"
                  })
              }))
          })

      }).catch(err => console.log(err))

    //*Si el usuario no existe en la base de datos
  } else if (!user) {
    //! Contraseña o usuario incorrectos
    res.status(401)
      .json({
        mensaje: "Contraseña o usuario incorrecto",
        status: false
      });
  }

};