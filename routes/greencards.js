var robo = require('../robo/');
var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  robo(1, 2, function(list) {
    res.send(list);
  });
});

module.exports = router;
