var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
/* GET home page. */
var user_type = 0;
router.get('/', function(req, res, next) {
  if(req.body.type){
    user_type = req.body.type;
  }else{
    user_type = 0;
  }
  console.log(user_type);
  res.render('index', { title: 'Express' });
});

module.exports = router;
