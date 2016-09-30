
var count = -1


var interestForm = document.forms["interest"]



var $NAinterest = $('#NAinterest')


      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player2;
      var player1;
      function onYouTubeIframeAPIReady() {
        player1 = new YT.Player('player1', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': loadVid1,


          }




        });
           player2 = new YT.Player('player2', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': loadVid2,



          }



        })



      }


//default load when it is a clicked link redirect
function loadVid1(){
    player1.cuePlaylist({listType:"search",
                    list: "documentary " + QueryString.NAinterest,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});}
function loadVid2(){
    player2.cuePlaylist({listType:"search",
                    list: "facts " + QueryString.NAinterest,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});


  }

//creates youtube element
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
$('#YTcontain').hide();
$('#resultContainer').hide();






//Toggle size for Videos

$('#player1Enlarge').toggle(function()
  {
    $('#player1').css('width','100%');
    $('#player1').css('height',500);
    $('#player2').hide();
    $('#player2Enlarge').hide();



  },
  function()
  {
    $('#player2').show();
    $('#player1').css('width','49.5%');
    $('#player1').css('height',300)
    $('#player2Enlarge').show();

  });

$('#player2Enlarge').toggle(function()
  {
    $('#player2').css('width','100%');
    $('#player2').css('height',500);
    $('#player1').hide();
    $('#player1Enlarge').hide();


  },
  function()
  {
    $('#player1').show();
    $('#player2').css('width','49.5%');
    $('#player2').css('height',300)
    $('#player1Enlarge').show();
    $('#player2Enlarge').show();

  });


//changes text from Enlarge to Revert for vid toggle button
$("button").on("click", function() {
  var el = $(this);
  el.text() == el.data("text-swap")
    ? el.text(el.data("text-original"))
    : el.text(el.data("text-swap"));
});





var submissionProto = function(){};

submissionProto.prototype.subVal = 0;
submissionProto.prototype.populateResults = function(){

count += 1

console.log(count)
$('#player2').show();
$('#player1').css('width','49.5%');
$('#player1').css('height',300)
$('#player2Enlarge').show();
$('#player1').show();
$('#player2').css('width','49.5%');
$('#player2').css('height',300)
$('#player1Enlarge').show();
$('#initialForm').css('position', "relative");
$('#initialForm').css('margin-top', "50px");
$('#animalQuickFacts').remove();
$('#sciClassContain').remove();

$('#wikiInsert').empty();
//$('#resultContainer').append('<div id="wikiInsert" class="clearfix"></div>')


$('#resultContainer').show();
var trippy = this.subVal

  $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page="  + this.subVal + "&callback=?&redirects",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];

            var nMark = markup.replace(/<a href="\/Wiki\/File:([\S\s]*?)\/a>/gi, "");

            var pMark = nMark.replace(/<img alt([\S\s]*?)\/>/gi, "");

var arr = []

            var dark = $('<div></div>').html(pMark);
            //document.write(pMark)
            $(dark).prepend('<div>');
            $(dark).append('</div>');
            console.log(dark)

            // remove any references
            dark.find('sup').remove();



            var headingsArr = []
            // remove cite error
            dark.find('.mw-ext-cite-error').remove();




           // document.write(dark.html())
            $('h2', dark).each(function(){

             $(this).find('.mw-editsection').remove();
                headingsArr.push($(this).text())
                var contText = $(this).nextAll('p').text();
                arr.push(contText) });

    var arrOfNextAll = []
    arrOfNextAll.push($('div', dark).nextAll('p, h3'))
    $('h2', dark).each(
          function(){

           arrOfNextAll.push($(this).nextAll('p, h3'));

        })



var arrSepBySect = []
        for (var i = 0; i < arrOfNextAll.length; i++){
          var temp = [];
            for (var d = 0; d < arrOfNextAll[i].length; d++){

                temp.push(arrOfNextAll[i][d].outerHTML)


            }
            var flat = temp.join("")
            arrSepBySect.push(flat)
        }

        var cleanArrSepBySect = arrSepBySect.filter(Boolean)

           var newArr = arr.filter(Boolean)


          headingsArr.shift();

          var removedContent = []

          var afterReplaced = [];

            for (var i = 0; i < cleanArrSepBySect.length; i++){
              if (cleanArrSepBySect[i+1] == undefined){
                afterReplaced.push(cleanArrSepBySect[i])
              }
              else{
              afterReplaced.push(cleanArrSepBySect[i].replace(cleanArrSepBySect[i+1], ""))}


            }





            for (var i = 0; i < newArr.length; i++){
              if (newArr[i+1] == undefined){
                removedContent.push(newArr[i])
              }
              else{
              removedContent.push(newArr[i].replace(newArr[i+1], ""))}


            }

//I think removed content is pointless

headingsArr.unshift('Overview')


headingsArr.length -= (headingsArr.length - afterReplaced.length)


$('#wikiInsert').prepend('<div id="headContain"></div>')
headingsArr.forEach(function(element, index) {
  if (index == 0){
  $('#headContain').append('<div class="showContBttn bSelected" id="bttnHead'+index+'">'+element+'</div>')
}
else
{
  $('#headContain').append('<div class="showContBttn" id="bttnHead'+index+'">'+element+'</div>')
}
  });




afterReplaced.forEach(function(element, index) {
  if (index == 0){
      $('#wikiInsert').append('<div class="contBodies" id="contBody'+index+'"">'+element+'</div')

  }
  else {
$('#wikiInsert').append('<div class="contBodies" id="contBody'+index+'" style="display: none">'+element+'</div')
}

$('.mw-editsection').remove()});


$('.showContBttn').click(function(){
  $('.showContBttn').css('color', 'black')
  $('.showContBttn').css('border-color', '#BABABA');
  $('.showContBttn').css('border-width', '1px');
  $(this).css('color', 'white')
  $(this).css("border-color", "#8DEDFF")
  $(this).css("border-width", '2px')


  $('.contBodies').hide()
  var bttnNumber = (this.id).replace("bttnHead","")

  $('#contBody'+bttnNumber).fadeIn(750);

});

//makes links redirect to corresponding Zang page
            $('a').each(
  function(){
    $(this).attr('href', ("?NAinterest=" + $(this).attr('href').substring(6,99)))

        });





          var joinedContent = afterReplaced.join();
         // var addedOverviewContent = joinedContent.push(blurb.text())
          var joinedHeads = headingsArr.join();
//Testing for Category
          //if it is an ANIMAL
         if ((/Taxonomy/i).test(joinedHeads)) {
          console.log('its an animal')
          player1.cuePlaylist({listType:"search",
                    list: "documentary " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

     player2.cuePlaylist({listType:"search",
                    list: "facts " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

     var quickFacts = '\
          <div id="animalQuickFacts" data-b4Here=SciclassContain>\
              <div id="QFBttnContain"> \
              \
                  <div class="QFBttn" id="lifeSpanBttn" data-insHere="LFcont"> \
                  </div> \
                     \
                  \
              </div>\
          </div>  '
     $('#YTcontain').after(quickFacts);



       $.getJSON("ALong.json", function(DTA){


var yearsOld = 0
 var tester2 = new RegExp("(" + trippy +")", "gi")
 
      for (var i = 0; i < DTA.length; i++){
        var tester = new RegExp(DTA[i]["CommonName"])
        



        if (tester2.test(tester))
         {yearsOld = (DTA[i]["Capt"])
       console.log(DTA[i])
     break}
       

      }

$('#lifeSpanBttn').append('The average <strong>LIFESPAN</strong> of a '+trippy +' is '+yearsOld+' years')




       });

var sciKingdom = $('td:contains("Kingdom")', dark).next('td').html();
var sciPhylum = $('td:contains("Phylum")', dark).next('td').html();
var sciClass = $('td:contains("Class")', dark).next('td').html();
var sciOrder = $('td:contains("Order")', dark).next('td').html();
var sciFamily = $('td:contains("Family")', dark).next('td').html();
var sciGenus = $('td:contains("Genus")', dark).next('td').html();
var sciSpecies = $('td:contains("Species")', dark).next('td').html();



    $('#animalQuickFacts').before('<div id="sciClassContain"><table id="SciClassTable"> \
\
        <tbody> \
            <tr>\
              <th colspan="2">Scientific Classification</th>\
            </tr> \
            <tr> \
              <td>Kingdom: </td>\
              <td> ' + sciKingdom + '</td>\
            </tr> \
            <tr> \
              <td>Phylum: </td>\
              <td> ' + sciPhylum + '</td>\
            </tr> \
            <tr> \
              <td>Class: </td>\
              <td> ' + sciClass + '</td>\
            </tr> \
            <tr> \
              <td>Order: </td>\
              <td> ' + sciOrder + '</td>\
            </tr> \
            <tr> \
              <td>Family: </td>\
              <td> ' + sciFamily + '</td>\
            </tr> \
            <tr> \
              <td>Genus: \
              <td> ' + sciGenus + '</td>\
            </tr> \
            <tr id="species"> \
              <td>Species: </td>\
              <td> ' + sciSpecies + '</td>\
            </tr> \
          \
        </tbody>\
      </table></div>')

    if (sciSpecies == null){

        $("#species").remove()
    }




   var allPwFood = $('p:contains("food")', dark).text();

   var foodTest1 = /\. [^(These)|(Other)][^\.]*(food)+[^\.]*/gi
   var foodTest2 = /^[^\.]*(food)+[^\.]*/gi

var match1a;
var match1b;




var arrMatchA = [];
var arrMatchB = [];
var fixedArrMatchA = [];
var fixedArrMatchB = [];

var allDiet = $('p:contains("diet")', dark).text();


    var dietTest1 = /\.(?!These)[^\.]*(diet)+[^\.]*/gi //FIND ME the other part seems to be causing a problem, i took it out, i didnt get to test it yet cause of internet so try to run code first
    var dietTest2 = /^[^\.]*(diet)+[^\.]*/gi

var match3a;
var match3b;
//console.log(dietTest1.exec(allDiet))
console.log(allDiet)
while ( ( match3a = dietTest1.exec(allDiet) ) != null )
{
    arrMatchA.push( match3a );

}


while ( ( match3b = dietTest2.exec(allDiet) ) != null )
{
    arrMatchB.push( match3b);

}
while ( ( match1a = foodTest1.exec(allPwFood) ) != null )
{
    arrMatchA.push( match1a );
}


while ( ( match1b = foodTest2.exec(allPwFood) ) != null )
{
    arrMatchB.push( match1b);
}


var allFeed = $('p:contains("feed")', dark).text();


    var feedTest1 = /\. [^(These)|(Other)][^\.]*(feed)+[^\.]*/gi
    var feedTest2 = /^[^\.]*(feed)+[^\.]*/gi

var match2a;
var match2b;

while ( ( match2a = feedTest1.exec(allFeed) ) != null )
{
    arrMatchA.push( match2a );
}


while ( ( match2b = feedTest2.exec(allFeed) ) != null )
{
    arrMatchB.push( match2b);

}


console.log(arrMatchA)
console.log(arrMatchB)




for (var i = 0; i < arrMatchA.length; i++){
  if (/^\.\w/.test(arrMatchA[i][0])){var fixed = arrMatchA[i][0].substring(1)
  var fixed2 = fixed.concat('.')

    fixedArrMatchA.push(fixed2)}
else{
  var fixed = arrMatchA[i][0].substring(2)
  var fixed2 = fixed.concat('.')

    fixedArrMatchA.push(fixed2)}
}

for (var i = 0; i < arrMatchB.length; i++){
  var fixed = arrMatchB[i][0]
  var fixed2 = fixed.concat('.')

    fixedArrMatchB.push(fixed2)
}

console.log(fixedArrMatchB)


var readyMatch = fixedArrMatchA.concat(fixedArrMatchB)
console.log(readyMatch)






$('#QFBttnContain').append('<div id="foodCont"><Strong>Feeding Habits</strong> (click for another fact)</div>');

readyMatch.forEach(function(element, index){
$('#foodCont').append('<p class="foodFacts" id="foodSentence'+index+'" style="display: none">'+element+'</p>')

});

var FSNumber = 0
if (FSNumber == 0){
  var foodsent = '#foodSentence'
  var ins = foodsent.concat(FSNumber)

$(ins).show();
 FSNumber += 1
}

$('#foodCont').click(function(){
if (readyMatch.length > FSNumber){

  var foodsent = '#foodSentence'
  var oneLess = FSNumber - 1
  var del = foodsent.concat(oneLess)
  var ins = foodsent.concat(FSNumber)
$(del).hide();
$(ins).show();
  FSNumber += 1}

if (readyMatch.length <= FSNumber){
      $('.foodFacts').hide()
      FSNumber = 0
       var foodsent = '#foodSentence'
  var ins = foodsent.concat(FSNumber)
$(ins).show();
 FSNumber += 1
}


});










   }

        //if it is a FAMOUS PERSON
        else if ((/was born/).test(joinedContent)){
          console.log('is a person');
        player1.cuePlaylist({listType:"search",
                    list: "life of " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

     player2.cuePlaylist({listType:"search",
                    list: "history " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});}

        //if it is a COUNTRY, CITY, STATE OR REGION
        else  if ((/Demographics/).test(joinedHeads)){
              console.log('is a place on map (state, country, region)');
              player1.cuePlaylist({listType:"search",
                    list: "geography " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

     player2.cuePlaylist({listType:"search",
                    list: "history " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

          }

          //if a manmade MONUMENT
         else if ((/monument/).test(joinedContent)){
              console.log('is a monument)');
              player1.cuePlaylist({listType:"search",
                    list: "documentary " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

              player2.cuePlaylist({listType:"search",
                    list: "history " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

          }

else if ((/concept/).test(joinedContent) && !(/was born/).test(joinedContent) && !(/Taxonomy/).test(joinedHeads)){
              console.log('is a science concept');
              player1.cuePlaylist({listType:"search",
                    list: "what is " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

     player2.cuePlaylist({listType:"search",
                    list: "how  " + youtubeVid + " works",
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

          }

        else if ((/concept/).test(joinedContent)){
          console.log('other science')
        }


        else{
           player1.cuePlaylist({listType:"search",
                    list: "documentary " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});

           player2.cuePlaylist({listType:"search",
                    list: "facts " + youtubeVid,
                    videoCategoryID: 'Education',
                    startSeconds:0,
                    suggestedQuality:"large"});
        }







        },




        error: function (errorMessage) {
        },

    });

$('#YTcontain').show()

var youtubeVid = this.subVal


}

document.getElementById("interest").addEventListener("click", function(event){
    event.preventDefault();})

$('#zangBox').click(function(){

  var manualSub = new submissionProto();
  manualSub.subVal = $NAinterest.val()
  manualSub.populateResults();

});

//makes enter key do same as button instead of submitting(thus refreshing)
$("#NAinterest").keydown(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
        var manualSub = new submissionProto();
  manualSub.subVal = $NAinterest.val()
  manualSub.populateResults();

};
    });


//finds text in part of URL = to NA interest for clicking links to redirect to a new Zang page

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("?");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();



//finds text in part of URL = to NA interest for clicking links to redirect to a new Zang page
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("?");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();





if (QueryString.NAinterest != undefined) {
  var redirectSub = new submissionProto();
  redirectSub.subVal = QueryString.NAinterest;
  redirectSub.populateResults();}

var puppies = {
  Dogs: ["squeak", "jerk", "tommy"]}
var template = $('#testTemplate').html();
$('#start').html(Mustache.render(template, puppies))
