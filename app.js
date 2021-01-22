const express = require('express');
const routes = require('./modules/routes');
const app = express();
const HOST = 'localhost';
const PORT = '3000';

app.set('view engine', 'pug');
app.set( 'views', './views');
app.use(express.static('public'))
app.use(routes);

app.listen(PORT, () => {
    console.log('Server running at http://localhost:3000');
})