// (function(){
//
// function  springerRequest(selection){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "http://api.springer.com/metadata/json?q=title:%22"+ selection + "%22&p=10&api_key=99b0beee028a8fd93c6d9221b925072b", true);
//     xhr.send();
//
//     xhr.onreadystatechange = function() {
//       var whole = JSON.parse(xhr.responseText)
//       // console.log(whole)
//       var cos = whole.records[0].abstract
//       // console.log(cos)
//
//       springerRender(whole)
//     }
//   }
//
//
//   events.on("selectionChanged", springerRequest)
//
//
//   function springerRender(retrieved){
//     console.log(retrieved)
//     var abstract = retrieved.records[0].abstract;
//     var title = retrieved.records[0].title;
//     var springerArr = [];
//     retrieved.records.forEach(function(inp, index){
//       springerArr.push({index: index, title: inp.title, abstract: inp.abstract.substring(8), url: inp.url[0].value, copyright: inp.copyright})
//
//     })
//
//     var springerData = {
//       springer: springerArr
//     }
//
//
//     $('#springerInsert').html(Mustache.render($('#mSpringer').html(), springerData))
//

    var sNum = 0
    var sSpring = '#springerArticle'.concat(sNum)

    $(sSpring).addClass('activeSpringer')

    $('#forwardArrow').on("click", function(){
      var sSpring = '#springerArticle'.concat(sNum)
      $(sSpring).removeClass('activeSpringer');
      if (sNum < 9){
        sNum += 1
      }
      else {
        sNum = 0
      }
      var sSpring = '#springerArticle'.concat(sNum)
      $(sSpring).addClass('activeSpringer')

    })

    $('#backArrow').on("click", function(){
      var sSpring = '#springerArticle'.concat(sNum)
      $(sSpring).removeClass('activeSpringer');
      if (sNum > 0){
        sNum -= 1
      }
      else {
        sNum = 9
      }
      var sSpring = '#springerArticle'.concat(sNum)
      $(sSpring).addClass('activeSpringer')

    })



//
//   }
//
//
//
// })();
