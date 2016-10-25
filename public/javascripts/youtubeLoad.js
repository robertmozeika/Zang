//CTRL F MIGHT CHANGE THIS     LOADVID1 NEEDS TO BE CHANGE
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var currentOffSet = "-300px"
var player2;
var player1;
var play1WayPoint;
var play2WayPoint
function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player1', {
    // height: '390',
    // width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': yt1Change,
      'onStateChange': play1Scroll


    }


  });

     player2 = new YT.Player('player2', {
    // height: '390',
    // width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': yt2Change,
      'onStateChange': play2Scroll


    }


  })

}

var wpEnabled = true;
function play1Scroll(event) {
        if (event.data == YT.PlayerState.PLAYING && wpEnabled == true) {
          play1WayPoint.enable();
        }
        if (event.data !== YT.PlayerState.PLAYING) {
          // $('#player1').removeClass('playFixed')
          play1WayPoint.disable();
        }
      }


function play2Scroll(event) {
        if (event.data == YT.PlayerState.PLAYING && wpEnabled == true) {
          play2WayPoint.enable();
        }
        if (event.data !== YT.PlayerState.PLAYING) {
          // $('#player2').removeClass('playFixed')
          play2WayPoint.disable();
        }
      }


var YTReadycheck = false
var YTReadycheck1 = false
var YTReadycheck2 = false

function yt1Change(){
  YTReadycheck1 = true;
  if (YTReadycheck2 === true){
    urlBar()
  }

}

function yt2Change(){
  YTReadycheck2 = true;
  if (YTReadycheck1 === true){
    urlBar()
  }

}

function urlBar(){
  console.log('once')
  events.emit('ytReady', "dangerous");

$('#player1').addClass('playReset');

var play1UpWayPoint = new Waypoint({
  element: document.getElementById('player1'),
  handler: function(direction) {

    if (direction == "up") {
      $('#player1').removeClass('playFixed');
      $('#closeYTBttn').hide();

    }
  },
  offset: function() {
  return -this.element.clientHeight
  }
});

var play2UpWayPoint = new Waypoint({
  element: document.getElementById('player2'),
  handler: function(direction) {

    if (direction == "up") {
      $('#player2').removeClass('playFixed');
      $('#closeYTBttn').hide();

    }
  },
  offset: function() {
  return -this.element.clientHeight
  }
});





  play1WayPoint = new Waypoint({
    element: document.getElementById('player1'),
    enabled: false,
    handler: function(direction) {
  		if (direction == "down") {
        $('#closeYTBttn').show();
        // $('#player1').removeClass('playReset')
        // $('#player1').removeClass('playBig')

        $('#player1').addClass('playFixed');
        // $('#player1').css('position', 'fixed');
        // $('#player1').css('top', '0px');
        // $('#player1').css('width', '25vw');
        // $('#player1').css('height', '15vw');
      }
    },
    offset: function() {
    return -this.element.clientHeight
    }
  })

  play2WayPoint = new Waypoint({
    element: document.getElementById('player2'),
    enabled: false,
    handler: function(direction) {
      if (direction == "down") {

        $('#player2').addClass('playFixed');
        $('#closeYTBttn').show();


      }
    },
    offset: function() {
    return -this.element.clientHeight
    }
  })



}



//creates youtube element
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Toggle size for Videos

$('#player1Enlarge').toggle(function()
  {
    // $('#player1').css('width','100%');
    // $('#player1').css('height',500);
    // $('#player2').hide();
    $('#player2Enlarge').css('opacity', '0');
    $('#player1').removeClass('playReset');
    $('#player2').removeClass('playReset')
    $('#player1').addClass('playBig');
    $('#player1Contain').removeClass('col-sm-6')

    $('#player1Contain').addClass('col-sm-12')
    $('#player2Contain').addClass('playHide');
    currentOffSet = $('#player1').height();
    Waypoint.refreshAll();



  },
  function()
  {
    // $('#player2').show();
    // $('#player1').css('width','49.5%');
    // $('#player1').css('height',300)
    $('#player2Enlarge').css('opacity', '1');
    $('#player1').removeClass('playBig');
    $('#player2Contain').removeClass('playHide');
    $('#player1').addClass('playReset');
    $('#player2').addClass('playReset');
    $('#player1Contain').addClass('col-sm-6')

    $('#player1Contain').removeClass('col-sm-12');

    Waypoint.refreshAll();


  });

$('#player2Enlarge').toggle(function()
  {
    // $('#player2').css('width','100%');
    // $('#player2').css('height',500);
    // $('#YTBttnContain').css('justify-content','flex-end');
    // $('#player1').hide();
    // $('#player1Enlarge').hide();
    $('#player1Enlarge').css('opacity', '0');

    $('#player2').removeClass('playReset');
    $('#player1').removeClass('playReset')
    $('#player2').addClass('playBig');
    $('#player1Contain').addClass('playHide');
    $('#player2Contain').removeClass('col-sm-6')

    $('#player2Contain').addClass('col-sm-12');

    Waypoint.refreshAll();



  },
  function()
  {
    // $('#player1').show();
    // $('#player2').css('width','49.5%');
    // $('#player2').css('height',300);
    $('#player1Enlarge').css('opacity', '1');
    // $('#player2Enlarge').show();
    $('#player2').removeClass('playBig');
    $('#player1Contain').removeClass('playHide');
    $('#player1').addClass('playReset');
    $('#player2').addClass('playReset');
    $('#player2Contain').addClass('col-sm-6')

    $('#player2Contain').removeClass('col-sm-12');

    Waypoint.refreshAll();




  });


//changes text from Enlarge to Revert for vid toggle button
$("button").on("click", function() {
  var el = $(this);
  el.text() == el.data("text-swap")
    ? el.text(el.data("text-original"))
    : el.text(el.data("text-swap"));
});


$('#closeYTBttn').on('click', function(){
  document.cookie = "wpEnable=false; expires=Thu, 18 Dec 2100 12:00:00 UTC";
  $('#player1').removeClass('playFixed');
  $('#player2').removeClass('playFixed');
  $('#closeYTBttn').hide();
  play2WayPoint.disable();
  play1WayPoint.disable();
  $('#reactYTShow').show();
  wpEnabled = false;

});



$('#reactYTShow').on('click', function(){
  document.cookie = "wpEnable=true; expires=Thu, 18 Dec 2100 12:00:00 UTC";
  $('#reactYTShow').hide();
  wpEnabled = true;
  if (player1.getPlayerState() == 1) {
    play1WayPoint.enable();
  }

  else if (player2.getPlayerState() == 1){
    play2WayPoint.enable();
  }


});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
console.log(getCookie("wpEnable"))
if (getCookie("wpEnable") == "false") {
  $('#reactYTShow').show();
  wpEnabled = false;
}
