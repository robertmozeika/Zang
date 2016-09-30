var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var aiCategorizer = require('./AICategorizerMod.js')
var pluralize = require('pluralize');


function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        var fieldencoded = encodeURIComponent(fields.NAinterest);
        var category = aiCategorizer(fields.NAinterest);
        console.log(category)
        if (category === 0) {
          return res.redirect('/Animals?valid=' + pluralize(fieldencoded, 1));
        }


        if ( 1 <= category <= 2) {

          return res.redirect('/Person?valid=' + fieldencoded);
        }
        if (8 <= category <= 10) {

          return res.redirect('/Region?valid=' + fieldencoded);
        }
        if (4 <= category <= 7) {

          return res.redirect('/ScienceConcept?valid=' + fieldencoded);
        }


    });
}

module.exports = processAllFieldsOfTheForm
