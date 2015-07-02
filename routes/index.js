var express = require('express'), fs = require("fs"), Firebase = require("firebase");
var router = express.Router();

var bmiRef = new Firebase("https://bmi-food-diary.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food Diary' });
});

router.get('/users', function(req, res, next) {
  
  bmiRef.child("user").once("value", function(snap) {
    res.json( { user: snap.val() } );
  });
  
});


router.post('/users', function(req, res, next) {
  
  bmiRef.child("user").set(req.body, function(err) {
    res.json(req.body);
  });
  
});

//

router.get('/foods', function(req, res, next) {
  
  bmiRef.child("food").once("value", function(snap) {
    console.log(snap.val());
    res.json( { foods: snap.val() } );
  });
  
});

router.post('/foods', function(req, res, next) {
  
  bmiRef.child("food").push(req.body, function(err) {
    res.json(req.body);
  });
  
});

router.delete('/foods/:key', function(req, res, next) {
  bmiRef.child("food").child(req.params.key).remove(function(err) {
    res.json(req.body);
  });
  
});

module.exports = router;
