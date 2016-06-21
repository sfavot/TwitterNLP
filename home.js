var express = require('express');

module.exports = function home() {
    var router = express.Router();

    router.post('/', (req, res) => {
      console.log(req.body);
      res.end('ok');
    });

    router.get('/', (req, res) => {
      res.render('home',
      {
        result: ''
      })
    });

    return router;
};
