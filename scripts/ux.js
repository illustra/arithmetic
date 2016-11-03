$(document).ready(function(){
	// Handlers
	$("#check").click(Mathcercise.game.handler);
	$("#main").click(Mathcercise.endGame);
	$("#gametitle").click(function(){
		if (Mathcercise.checkIfReady())
			Mathcercise.beginGame();
	});

	// Param selectors
	$("#modeselector .options td").each(function(){
		$(this).click(function(){
			if (!$(this).hasClass("active")) {
				// Set this as active
				$(this).addClass("active");
				$("td[data-mode=" + Mathcercise.params.mode + "]").removeClass("active");
				Mathcercise.params.mode = parseInt($(this).attr("data-mode"));
			} else {
				$(this).removeClass("active");
				Mathcercise.params.mode = 0;
			}
			Mathcercise.checkIfReady();
		});
	});
	$("#levelselector .options td").each(function(){
		$(this).click(function(){
			if (!$(this).hasClass("active")) {
				// Set this as active
				var cr = Mathcercise.params.range;
				$(this).addClass("active");
				$("td[data-range=" + cr[0] + "-" + cr[1] + "]").removeClass("active");
				
				var nr = ($(this).attr("data-range")).split("-");
				Mathcercise.params.range = [ parseInt(nr[0]), parseInt(nr[1]) ];
			} else {
				$(this).removeClass("active");
				Mathcercise.params.range = [null, null];
			}
			Mathcercise.checkIfReady();
		});
	});
});

var Mathcercise = {
	game: null,
	params: {
		mode: 0,
		range: []
	},
	checkIfReady: function() {
		if (this.params.mode != 0 && this.params.range[1] != null) {
			$("#gametitle").addClass("active");
			$("#gametitle h1").text("start game");
			return true;
		} else {
			$("#gametitle").removeClass("active");
			$("#gametitle h1").text("mathcercise");
			return false;
		}
	},
	beginGame: function(){
		// Animate menu outwards
		$("#mainmenu").animate({'left': '-100%'}, 400);

		// Pass params to game engine
		this.game.currentRange = this.params.range;
		this.game.currentMode = this.params.mode;

		// Then start the game
		this.game.begin();
	},
	endGame: function(){
		// Animate menu inwards
		$("#mainmenu").animate({'left': '0'}, 400);

		// Empty params
		$("#modeselector .active").removeClass("active");
		$("#levelselector .active").removeClass("active");
		Mathcercise.params.mode = 0;
		Mathcercise.params.range = [null,null];
		Mathcercise.game.currentMode = 0;
		Mathcercise.game.currentRange = [null,null];
		Mathcercise.checkIfReady();
	}
};