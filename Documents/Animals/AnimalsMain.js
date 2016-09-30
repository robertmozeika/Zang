//change youtube Load to new cookie

var cookieJar = document.cookie;

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

var selectionCookie = getCookie("selection");
// getWiki.getAjax(selectionCookie);







(function(){
  var animalQF = {
    joinedFeedFacts: [],
    obj_FeedFacts: [],
    clData: 0,
    ffData: 0,
    FSNumber: 0,


    years: {
      Wild: 0,
      WildRetrieved: "",
      Capt: 0,
      CaptRetrieved: "",
    },


    bind: function(){
      events.on('wikiSent', this.init.bind(this))
      events.on('ytReady', this.youtubeChange)
      $('#foodCont').click(this.buttonRender.bind(this))


    },

    init: function(){
      // this.youtubeChange();
      this.cacheDom();
      this.classification();
      this.foodFacts();
      this.lifeSpan();



    },

    cacheDom: function(){
      this.$animalQF = $('#animalQuickFacts')
      this.$classTemplate = $('#mSciClass').html();
      this.$insertTable = $('#insSciTable');
      this.$foodTemplate = $('#mFoodFacts').html();
      this.$insertFoodFacts = $('#foodCont');




    },

    render: function(){
      this.$animalQF.show()
      this.$insertTable.html(Mustache.render(this.$classTemplate, this.clData))
      this.$insertFoodFacts.html(Mustache.render(this.$foodTemplate, this.ffData))
      var foodsent = '#foodSentence'
      var ins = '#foodSentence'.concat(this.FSNumber)
      $(ins).show();
      $('#lifeSpanBttn').html(Mustache.render($('#mWildYears').html(), animalQF))







    },

    buttonRender: function(){
    if (this.FSNumber < this.obj_FeedFacts.length - 1){
      this.FSNumber += 1}
    else {
      this.FSNumber = 0
    }
      this.render();

    },

    youtubeChange: function(){

      // if (YTReadycheck == true){
      player1.cuePlaylist({listType:"search",
                list: "documentary " + (resultBox.selection || selectionCookie),
                videoCategoryID: 'Education',
                startSeconds:0,
                suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
                list: "facts " + (resultBox.selection || selectionCookie),
                videoCategoryID: 'Education',
                startSeconds:0,
                suggestedQuality:"default"});
      // }
      //
      // else {
      //   setTimeout(animalQF.youtubeChange, 700)
      // }


    },

    lifeSpan: function(){
      $.getJSON("../ALong.json", function(DTA){



       var tester2 = new RegExp("(" + (resultBox.selection || selectionCookie) +")", "gi")

            for (var i = 0; i < DTA.length; i++){
              var tester = new RegExp(DTA[i]["CommonName"])
              var testedMatch = tester2.test(tester)

              if ((animalQF.years.Wild === 0) && (testedMatch === true) && (DTA[i]["Wild"] !== "NA"))
               {console.log(DTA[i])
                 animalQF.years.Wild = DTA[i]["Wild"]
                animalQF.years.WildRetrieved = DTA[i]["CommonName"]
              }

              if ((animalQF.years.Capt === 0) && (testedMatch === true) && (DTA[i]["Capt"] !== "NA"))
               {animalQF.years.Capt = (DTA[i]["Capt"])
               animalQF.years.CaptRetrieved = DTA[i]["CommonName"]
              }



            }
            console.log("obj is wild " + animalQF.years.Wild)
            console.log("obj is Capt " + animalQF.years.Capt)
            animalQF.render();

      })


    },

    classification: function(){
      var clair = [
        {name: "Kingdom",
          result: getWiki.wikiText.find('td:contains("Kingdom")').next('td').text()},
        {name: "Phylum",
          result: getWiki.wikiText.find('td:contains("Phylum")').next('td').text()},
        {name: "Class",
          result: getWiki.wikiText.find('td:contains("Class")').next('td').text()},
        {name: "Order",
          result: getWiki.wikiText.find('td:contains("Order")').next('td').text()},
        {name: "Family",
          result: getWiki.wikiText.find('td:contains("Family")').next('td').text()},
        {name: "Genus",
          result: getWiki.wikiText.find('td:contains("Genus")').next('td').text()},

      ]


      this.clData = {
        clObj: clair
      }


    },

    foodFacts: function(){

      this.joinedFeedFacts = [];
      this.obj_FeedFacts = [];
      this.ffData = 0;
      this.FSNumber = 0;
      this.years = {
        Wild: 0,
        Capt: 0,
      };

      var allPwFood = getWiki.wikiText.find('p:contains("food")').text();
      var foodTest1 = /\. [^(These)|(Other)][^\.]*(food)+[^\.]*/gi
      var foodTest2 = /^[^\.]*(food)+[^\.]*/gi

       var match1a;
       var match1b;




       var arrMatchA = [];
       var arrMatchB = [];
       var fixedArrMatchA = [];
       var fixedArrMatchB = [];

       var allDiet = getWiki.wikiText.find('p:contains("diet")').text();


           var dietTest1 = /\.(?!These)[^\.]*(diet)+[^\.]*/gi //FIND ME the other part seems to be causing a problem, i took it out, i didnt get to test it yet cause of internet so try to run code first
           var dietTest2 = /^[^\.]*(diet)+[^\.]*/gi

       var match3a;
       var match3b;

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


       var allFeed = getWiki.wikiText.find('p:contains("feed")').text();


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



       this.joinedFeedFacts = fixedArrMatchA.concat(fixedArrMatchB)

       this.arr2Obj()



    },

    arr2Obj: function(){

      for (idx in this.joinedFeedFacts){
        this.obj_FeedFacts.push({'index': idx, 'str': this.joinedFeedFacts[idx]})
      }

      this.ffData = { FFObj: this.obj_FeedFacts}


    },

  }
animalQF.bind()

})()
