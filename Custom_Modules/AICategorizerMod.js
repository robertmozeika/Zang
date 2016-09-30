var index = require('../routes/index.js');
var PubSub = require('pubsub-js');
var retinaSDK = require('retinasdk');

var intTopic = 0
var topicSubscribe = function( msg, data ){
    aiCategorizer(data)
};

var intTopic = PubSub.subscribe( 'TOPIC', topicSubscribe );



  //event set after selection change on zangMain so it doesn't run twice


  // events.on('selectionChanged', aiCategorizer)

  function aiCategorizer(selection){
    console.log('ai happened')
    var liteClient = retinaSDK.LiteClient("4196fcd0-65bc-11e6-a057-97f4c970893c");
    var fullClient = retinaSDK.FullClient("4196fcd0-65bc-11e6-a057-97f4c970893c");
    var categories = ["animals", 'plant', "biography", 'monument', 'science', 'biology', 'physics', 'process', 'border',  'state', 'country']
    var similiarArr = []
    var max = 0
    var rightCategory = "";

    var comparison1 = [{"term": selection}, {"term": "animals"}];
    var comparison2 = [{"term": selection}, {"text": 'plant'}];
    var comparison3 = [{"term": selection}, {"text": 'biography'}];
    var comparison4 = [{"term": selection}, {"text": 'monument'}];
    var comparison5 = [{"term": selection}, {"text": 'science'}];
    var comparison6 = [{"term": selection}, {"text": 'biology'}];
    var comparison7 = [{"term": selection}, {"text": 'physics'}];
    var comparison8 = [{"term": selection}, {"text": 'process'}];
    var comparison9 = [{"term": selection}, {"text": 'border'}];
    var comparison10 = [{"term": selection}, {"text": 'state'}];
    var comparison11 = [{"term": selection}, {"text": 'country'}];


    var maxVal = 0
    var topCat = ""
    var bulkComp = fullClient.compareBulk({comparisons: [comparison1, comparison2, comparison3, comparison4, comparison5, comparison6, comparison7, comparison8, comparison9, comparison10, comparison11]})
    bulkComp.forEach(function(result, index){
      if (result.cosineSimilarity > maxVal){
        maxVal = result.cosineSimilarity;
        topCat = index
      }
    })

    // console.log("top is " + topCat)
    //
    // for (var i = 0; i < categories.length; i++){
    //
    //   var simValue = liteClient.compare(selection, categories[i])
    //   console.log("For " + categories[i] + "max is " + max + " and sim value is " + simValue)
    //   if (simValue > max){
    //     max = simValue;
    //     rightCategory  = categories[i];
    //   }
    // }
    //
    // console.log(max, rightCategory)

    return topCat

  }

  module.exports = aiCategorizer
