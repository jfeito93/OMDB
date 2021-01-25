const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// * Si el usuario ha hecho login con contraseña y usuario, usar JWT
    //*Esta función se va a ejecutar en routes.js, en las rutas protegidas
//exports.authJWT = require('express').Router().use((req, res, next) => {
//    const token = req.headers['access-token'];
//	
//    if (token) {
//      jwt.verify(token, app.get('key'), (err, decoded) => {      
//        if (err) {
//          return res.json({ mensaje: 'Token inválida' });    
//        } else {
//          req.decoded = decoded;    
//          next();
//        }
//      });
//    } else {
//      res.send({ 
//          mensaje: 'Token no proveída.' 
//      });
//   }
// }); 
// * Si el usuario ha iniciado sesión con google, usar firebase.auth()
// TODO investigar como se usa firebase con node.js o si solo se puede usar en los scripts de /public