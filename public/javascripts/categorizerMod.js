var autoCategory = (function(){


  var categorizer = {
    category: 0,

    bind: function(){
      events.on("newWikiArrays", this.analyzeCategory.bind(this))
    },

    analyzeCategory: function(wikiArrays){
      var joinedContent = wikiArrays.paragraphsArr.join();
      var joinedHeads = wikiArrays.headingsArr.join();

      if ((/Taxonomy/i).test(joinedHeads) || (/Habitat/i).test(joinedHeads) || (/classification/i).test(joinedHeads)) {
        this.category = "animal";
        // window.location.href = "/Animals/Animal.html";

        events.emit('categoryAnimal', categorizer.category)


      }

      else if ((/was born/).test(joinedContent)){
        this.category = "person"
        events.emit('categoryPerson', categorizer.category)

      }



      else  if ((/Demographics/).test(joinedHeads)){
        this.category = "politicalRegion"
        events.emit('categoryPoliticalRegion', categorizer.category)

      }


      else  if ((/monument/).test(joinedContent)){
        this.category = "monument"
        events.emit('categoryMonument', categorizer.category)

      }




      else if ((/concept/).test(joinedContent) || (/concept/).test(joinedHeads) ){
        this.category = "scienceConcept"
        events.emit('categoryScienceConcept', categorizer.category)

      }

      else {
        this.category = "unknown"
        events.emit('categoryUnknown', categorizer.category)

      }

      events.emit('categoryChange', categorizer.category)
      }
    }

    categorizer.bind()

  })()



var categoryPoliticalRegion = (function(){
  var  politicalRegionGenerator = {

    bind: function(){
      events.on('categoryPoliticalRegion', this.youtubeChange)
    },


    youtubeChange: function(){
      if (YTReadycheck == true){
      console.log('political Region')
      player1.cuePlaylist({listType:"search",
            list: "geography " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
            list: "history " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});
      }

      else {
        console.log("didn't work yet")
        setTimeout(politicalRegionGenerator.youtubeChange, 700)
      }


      }

    }
  politicalRegionGenerator.bind()


  })()

var categoryMonument = (function(){
  var  monumentGenerator = {

    bind: function(){
      events.on('categoryMonument', this.youtubeChange)
    },


    youtubeChange: function(){
      if (YTReadycheck == true){
      console.log('monument')
      player1.cuePlaylist({listType:"search",
            list: "documentary " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
            list: "history " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});}






        else {
          console.log("didn't work yet")
          setTimeout(monumentGenerator.youtubeChange, 700)
        }
    }
  }



  monumentGenerator.bind()


  })()

var categoryScienceConcept = (function(){
  var  scienceConceptGenerator = {

    bind: function(){
      events.on('categoryScienceConcept', this.youtubeChange)
    },


    youtubeChange: function(){
      console.log('science concept')
      if (YTReadycheck == true){
      player1.cuePlaylist({listType:"search",
            list: "what is " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
            list: "how " + resultBox.selection + " works",
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});}



      else {
        console.log("didn't work yet")
      setTimeout(scienceConceptGenerator.youtubeChange, 700)
      }
    }
  }

  scienceConceptGenerator.bind()


  })()


var categoryUnknown = (function(){
  var  unknownGenerator = {

    bind: function(){
      events.on('categoryUnknown', this.youtubeChange)
    },


    youtubeChange: function(){
      console.log('unknown')

      if (YTReadycheck == true){
      player1.cuePlaylist({listType:"search",
            list: "what is " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});

      player2.cuePlaylist({listType:"search",
            list: "everything you need to know " + resultBox.selection,
            videoCategoryID: 'Education',
            startSeconds:0,
            suggestedQuality:"default"});
      }

      else {
        console.log("didn't work yet")
        setTimeout(unknownGenerator.youtubeChange, 700)
      }

    }

  }

  unknownGenerator.bind()


  })()
