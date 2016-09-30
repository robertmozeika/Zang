//retrieves wikipedia text and returns it with images removed in var wikiText
var getWiki = {
  wikiText: 0,
  init: function(){
    this.bind();

  },

  bind: function(){
    events.on('selectionChanged', this.getAjax.bind(this))
  },

  getAjax: function(selection){
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page="  + selection + "&callback=?&redirects",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];

            var nMark = markup.replace(/<a href="\/Wiki\/File:([\S\s]*?)\/a>/gi, "");

            var pMark = nMark.replace(/<img alt([\S\s]*?)\/>/gi, "");
            wikiText = $('<div></div>').html(pMark);

            //this helps for when we are searching for eating Habits
            wikiText.prepend('<div>');
            wikiText.append('</div>');

            // remove any references
            wikiText.find('sup').remove();




            // remove cite error
            wikiText.find('.mw-ext-cite-error').remove();
            getWiki.wikiText = wikiText


            events.emit('wikiSent', wikiText)
          }
        })
      }

}

getWiki.init()




var wikiMaker = (function(){

var wikiArrays = {
  headingsArr: [],

//previously was afterReplaced
  paragraphsArr: [],

  obj_Headings: [],
  obj_Paragraphs: [],


  init: function(){
    this.cacheDom();
    this.makeArrays();
    this.paragraphsArr = [],
    this.obj_Headings = [],
    this.obj_Paragraphs = []


  },

  cacheDom: function(){
    this.$wikiInsert = $('#wikiInsert');
    this.$headContain = $('#headContain');
    this.$templateHead = $('#mHeadButtons').html();
    this.$templatePara = $("#mParaScript").html();
    this.$paragraphContain = $('#paragraphContain');




  },

  cacheDomButtons: function(){
    this.$showContBttn = $('.showContBttn')
    this.$contBodies = $('.contBodies')
    this.bind();


  },

  showButton: function(){
    wikiArrays.$showContBttn.removeClass('bSelected')
    $(this).addClass('bSelected')


    wikiArrays.$contBodies.hide()
    var bttnNumber = (this.id).replace("bttnHead","")
    $('#contBody'+bttnNumber).fadeIn(750)


  },

  bind: function(){
    this.$showContBttn.on("click", wikiArrays.showButton)


  },


  render: function(){

var mHeadData = {
  mHeadings: wikiArrays.obj_Headings
}

var mParaData = {
  mParagraphs: wikiArrays.obj_Paragraphs
}


    this.$headContain.html(Mustache.to_html(this.$templateHead, mHeadData))

    this.$paragraphContain.html(Mustache.render(wikiArrays.$templatePara, mParaData))
    $('#contBody0').show();
    $('#bttnHead0').addClass('bSelected')

    //changes wikipedia redirect links
    $('.contBodies').find('a').each(
      function(){
        $(this).attr('href', ("?" + $(this).attr('href').substring(6,99)))
    });


    this.cacheDomButtons()
  },



  makeArrays: function(){


    var arr = []





    wikiText.find('.mw-editsection').remove();
    // document.write(wikiText.html())
    $('ul', wikiText).last().remove();
    wikiText.find('h2').each(function(){

// document.write(wikiText.html())
        wikiArrays.headingsArr.push($(this).text())
        var contText = $(this).nextAll('p').text();
        arr.push(contText) });
          var arrOfNextAll = []
          arrOfNextAll.push(wikiText.find('div:first-child').nextAll('p, h3'))
          $('h2', wikiText).each(
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


            wikiArrays.headingsArr.shift();




              for (var i = 0; i < cleanArrSepBySect.length; i++){
                if (cleanArrSepBySect[i+1] == undefined){
                  this.paragraphsArr.push(cleanArrSepBySect[i])
                }
                else{
                this.paragraphsArr.push(cleanArrSepBySect[i].replace(cleanArrSepBySect[i+1], ""))}


              }
              // var first = $.parseHTML()
              // html = $.parseHTML()
              var removeUL = $('<div></div>').html(this.paragraphsArr[0])
              removeUL.find('ul').remove()

              this.paragraphsArr[0] = removeUL[0].innerHTML


              // first.find('ul').remove();
              // console.log(first)


          this.headingsArr.unshift('Overview')

          this.headingsArr.length -= (this.headingsArr.length - this.paragraphsArr.length);

          // events.emit("newWikiArrays", wikiArrays)
          wikiArrays.arr2Obj()

  },

  arr2Obj: function(){

    for (idx in wikiArrays.headingsArr){
      wikiArrays.obj_Headings.push({'index': idx, 'str': wikiArrays.headingsArr[idx]})
    }

    for (idx in wikiArrays.paragraphsArr){
      wikiArrays.obj_Paragraphs.push({'index': idx, 'str': wikiArrays.paragraphsArr[idx]})
    }

    this.render()


  },




}

events.on('wikiSent', wikiArrays.init.bind(wikiArrays))
})();

//runs initializer after prompt from bind
// wikiArrays.bind();
