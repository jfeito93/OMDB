const routes = require('./modules/routes');
const express = require('express');
var cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const path = require('path')
const app = express();
const HOST = 'localhost';
const PORT = '3000';

//Middleware
dotenv.config()
app.set('view engine', 'pug');
app.set( 'views', './views');
app.use(express.json()) // ¿? - dudo de su necesidad por no saber bien si sería necesario su uso //! Sustituye a body-parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(routes);

// TODO Error Handling

app.listen(PORT, () => {
    console.log('Server running at http://localhost:3000');
})