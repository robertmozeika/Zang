var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var PubSub = require('pubsub-js');
var AIprocess = require('../Custom_Modules/AIprocess.js')

var tester = require('./testfile.js')
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index',{user: "Great User",title:"homepage"});
// res.sendFile(path.join(__dirname, '../views', 'index.html'));
});


router.post('/', function(req, res){
  AIprocess(req, res);
})





module.exports = router;
