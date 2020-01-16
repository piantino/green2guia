var guiabolso = require('../robo/guiabolso');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  guiabolso.addTransactions(req.body.email, req.body.password, req.body.transactions, function(error, list) {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.send(list);
  });
});

module.exports = router;
