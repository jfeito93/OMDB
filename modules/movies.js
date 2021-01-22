const fetch = require('./utils/fetch');

exports.getHome = (req, res) => {
    res.status(200).render('index');
};