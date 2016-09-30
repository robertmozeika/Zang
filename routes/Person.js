var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var PubSub = require('pubsub-js');
var request= require('request');
var AIprocess = require('../Custom_Modules/AIprocess.js')
var SpringerMod = require('../Custom_Modules/SpringerMod.js')



/* GET users listing. */
router.get('/', function(req, res, next) {

  SpringerMod(req.query.valid, res, 'person')


});

router.post('/', function(req, res){
  console.log('posted');
  AIprocess(req, res);
})

module.exports = router;
