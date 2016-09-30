// COOKIES NOT NEEDED AS OF NOW

// var cookieJar = document.cookie;
// console.log(cookieJar)
//
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length,c.length);
//         }
//     }
//     return "";
// }
//
// var selectionCookie = getCookie("selection")
// console.log(selectionCookie);
// getWiki.getAjax(selectionCookie)


  var  personGenerator = {

    bind: function(){
      events.on('ytReady', this.youtubeChange)
    },


    youtubeChange: function(){

      // if (YTReadycheck == true){
      player1.cuePlaylist({listType:"search",
                  list: "life of " + (resultBox.selection || selectionCookie),
                  videoCategoryID: 'Education',
                  startSeconds:0,
                  suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
                  list: "history " + (resultBox.selection || selectionCookie),
                  videoCategoryID: 'Education',
                  startSeconds:0,
                  suggestedQuality:"default"});
      // }

      // else {
      //   console.log("didn't work yet")
      //   setTimeout(personGenerator.youtubeChange, 700)
      // }

    }
  }
  personGenerator.bind();
