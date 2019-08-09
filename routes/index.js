var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  //console.log(req.session.errors + " THIS IS REQ SESSION ERRORS");

  req.session.errors = null;
});

router.post('/submit', [ 
  // Check validity]
  check('email', 'Invalid email address').isEmail(),
  check('password').isLength({min: 4}).withMessage('Password is invalid'),
  check('password').custom(( value, {req}) => {
    if(value !== req.body.confirmPassword) {
      throw new Error('Password confirmation is incorrect');
    } else {
        return true;
    }
  })   
], (req, res, next) =>{
  //error handling
  const errors = validationResult(req);
  console.log("This is an array" + errors.mapped());
  console.log(req.body);
  if(!errors.isEmpty()) {
    console.log("there is an error");
    req.session.success = false;
    req.session.errors = errors.mapped();
    
  } else {
    console.log("there is no error");
    req.session.success = true;
    
  }
  res.redirect('/');
});


module.exports = router;
