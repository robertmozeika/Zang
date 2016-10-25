

var resultBox = {
	selection: 0,
	init: function(){
		this.cacheDom();
		this.bind();
	},
	cacheDom: function(){
		this.$NAinterest = $('#NAinterest');
		this.$searchButton = $('#searchButton');
		this.$resultContainer = $('#resultContainer');
		this.$initialForm = $('#initialForm');
		this.$player1 = $('#player1');
		this.$player2 = $('#player2');
		this.$player1Enlarge = $('#player1Enlarge');
		this.$player2Enlarge = $('#player2Enlarge');


	},
	bind: function(){

		// this.$searchButton.on('click', this.search.bind(this))
		// this.$NAinterest.on('keydown', this.entered)



	},
	render: function(){
		//when search or entered passes the selection
	if (typeof(this.selection) == "string" )
		{

			document.cookie = "selection=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
			document.cookie = "selection=" + resultBox.selection + ";  expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/";

			this.$resultContainer.show()
			//moves form from center to top when result box shows
			// this.$initialForm.css('position', "relative");
			// this.$initialForm.css('margin-top', "50px");
			// this.$initialForm.css('height', "0px");
			// // this.$initialForm.css('width', "800px");
			// this.$initialForm.css('background-color', "transparent");
			// this.$initialForm.css('margin-bottom', "0px");
			// $('#openingText').remove();
			// $("#searchButton").css('display', 'inline-block');
			// $("#searchButton").css('top', '-3px');
			// $("#NAinterest").css('display', 'inline-block')
			//resets result box
			this.$player1.addClass('playReset');
			this.$player2.addClass('playReset');
			// this.$player2.show();
			// resultBox.$player1.css('width','49.5%');
			// this.$player1.css('height',300)
			this.$player2Enlarge.show();
			// this.$player1.show();
			// this.$player2.css('width','49.5%');
			// this.$player2.css('height',300)
			this.$player1Enlarge.show();



			events.emit("selectionChanged", resultBox.selection)

		}


	},
	search: function(){
		if (this.$NAinterest.val() !== "")
			{

				this.selection = this.$NAinterest.val()
				this.cacheDom();
				this.render();}
	},

	entered: function(){
		if (event.keyCode == 13 && resultBox.$NAinterest.val() !== ""){

			event.preventDefault();
			resultBox.selection = resultBox.$NAinterest.val()
			resultBox.cacheDom();
			resultBox.render();}

	}

}

	resultBox.init();


var limiter = 0
//function urlBar(){
//this runs if someone clicks a link, because of wikiMod the link value is added to the url
if (window.location.search.substring(12) != "" && limiter === 0) {
	resultBox.selection = window.location.search.substring(12)
	resultBox.render()
	limiter += 1;
	console.log(window.location)
}



// else {
// 	limiter += 1
// 	window.location.search = (resultBox.selection);
//
// }
