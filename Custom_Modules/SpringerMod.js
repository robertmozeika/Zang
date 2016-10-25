var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');


function springerMod(query, res, page){

  request("http://api.springer.com/metadata/json?q=title:%22"+ query.valid + "%22&p=10&api_key=99b0beee028a8fd93c6d9221b925072b",  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var whole = JSON.parse(body)

      var cos = whole.records[0].abstract
      var cat = cos
      springerRender(whole, query, res, page)
    }
  })


function springerRender(retrieved, req, res){
  var abstract = retrieved.records[0].abstract;
  var title = retrieved.records[0].title;
  var springerArr = [];
  retrieved.records.forEach(function(inp, index){
    springerArr.push({index: index, title: inp.title, abstract: inp.abstract.substring(8), url: inp.url[0].value, copyright: inp.copyright})

  })

  var springerData = {
    springer: springerArr
  }

  res.render(page, { slct: query.valid, trial: springerArr, cat: query.c });

}


}

module.exports = springerMod
