var express = require('express'), fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food Diary' });
});

router.get('/foods', function(req, res, next) {
  fs.readFile("foods.json", "utf8", function(err, data){
    if(err){
      throw err;
    }
    res.json(data);
  })
});


router.post('/foods', function(req, res, next) {
  
  console.log(req.body);
  fs.appendFile("foods.json", JSON.stringify(req.body)+",", function(err){
    if (err){
      throw err;
    }
    res.json(req.body);
  });
});

module.exports = router;
