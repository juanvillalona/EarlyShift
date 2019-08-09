var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  console.log(req.session.errors + " THIS IS REQ SESSION ERRORS");

  req.session.errors = null;
});

router.post('/submit', [ 
  // Check validity
  check('email', 'Invalid email address').isEmail(),
  check('password', 'Password is invalid').isLength({min: 4})
], (req, res, next) =>{
  //error handling
  var errors = validationResult(req);
  console.log(errors.isEmpty + "ERROR HERE");
  if(!errors.isEmpty()) {
    //req.session.errors = errors;
    console.log("there is an error");
    req.session.success = false;
    req.session.errors = errors;
    
    _.each(errors, function(key, value) {
      console.log(key, value);
  });

  } else {
    console.log("there is no error");
    req.session.success = true;
    req.session.errors = errors.array({msg});
  }
  res.redirect('/');
});


module.exports = router;
