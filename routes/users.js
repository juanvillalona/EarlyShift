var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//http://localhost:8000/users/details
router.get('/details', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
