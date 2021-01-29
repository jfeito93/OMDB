const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const users = [
  {
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
    role: "victima",
  },
];
// * Si el usuario ha hecho login con contraseña y usuario, usar JWT
//*Esta función se va a ejecutar en routes.js, en las rutas protegidas
exports.checkToken = (req, res, next) => {
  //  console.log(req)
  if (req.cookies.authcookie) {
    //get authcookie from request
    const authcookie = req.cookies.authcookie;
    //verify token which is in cookie value
    jwt.verify(authcookie, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else if (data.role === "admin") {
        req.user = data.user;
        next();
      } else if (data.role === "user"){
        req.user = data.user;
        next();
      }else if(data.role === "victima"){
        req.user = data.user;
        next();
      }
    });
  } else {
    res.render("login");
  }
};
exports.signIn = async (req, res) => {
  const username = req.body.email;
  const password = req.body.pw;
  // filter user from the users array by username and password
  const user = await users.find((u) => {
    return u.email === username && u.pw === password;
  });
  //Si la contraseña que nos han enviado coincide (ESTRICTO) con la contraseña que tiene asociada el usuario del mail que nos has introducido
  if (user) {
    //* El token se crea aquí
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.TOKEN_SECRET);
    res
      .cookie("authcookie", token, { maxAge: 900000, httpOnly: true })
      .json({ mensaje: "Logging correcto", status: true });

    //*La cuenta no existe en la BD
  } else if (users.find((u) => u.email === username)) {
    res.json({ mensaje: "Contraseña incorrecta", status: false });
  } else {
    res.json({ mensaje: "La cuenta no existe", status: false });
  }
};
// * Si el usuario ha iniciado sesión con google, usar firebase.auth()
// TODO investigar como se usa firebase con node.js o si solo se puede usar en los scripts de /public
