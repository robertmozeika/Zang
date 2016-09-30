var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var PubSub = require('pubsub-js');
var AIprocess = require('../Custom_Modules/AIprocess.js')
var SpringerMod = require('../Custom_Modules/SpringerMod.js');
var pluralize = require('pluralize');




var request = require('request')


/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(pluralize('dogs', 1))
  var sArr = SpringerMod(req.query.valid, res, 'animal')


});

router.post('/', function(req, res){
  console.log('posted');
  AIprocess(req, res);
})



module.exports = router;
