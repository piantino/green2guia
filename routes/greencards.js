var robo = require('../robo/');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  robo(req.body.cpf, req.body.password, function(error, list) {
    res.send(list);
  });
});

module.exports = router;
