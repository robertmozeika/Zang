// (function(){
//   //event set after selection change on zangMain so it doesn't run twice
//
//
//   events.on('selectionChanged', aiCategorizer)
//
//   function aiCategorizer(selection){
//     console.log('ai happened')
//     var liteClient = retinaSDK.LiteClient("4196fcd0-65bc-11e6-a057-97f4c970893c");
//     var fullClient = retinaSDK.FullClient("4196fcd0-65bc-11e6-a057-97f4c970893c")
//
//     var rest = fullClient.getContextsForTerm('dog');
//     console.log(rest)
//     var categories = ["animals", "biography", 'border', 'monument', 'science']
//     var similiarArr = []
//     var max = 0
//     var rightCategory = ""
//
//     for (var i = 0; i < categories.length; i++){
//
//       var simValue = liteClient.compare(selection, categories[i])
//       console.log("For " + categories[i] + "max is " + max + " and sim value is " + simValue)
//       if (simValue > max){
//         max = simValue;
//         rightCategory  = categories[i];
//       }
//     }
//
//
//
//     console.log(max, rightCategory)
//     if (rightCategory === "animals") {
//       window.location.href = "/Animals/Animal.html?" + resultBox.selection
//     }
//
//     if (rightCategory === "biography") {
//       window.location.href = "/FamousPerson/person.html?" + resultBox.selection
//     }
//
//     if (rightCategory === "border") {
//       window.location.href = "/Region/region.html?" + resultBox.selection
//     }
//
//
//   }
//
// })();
