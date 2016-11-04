$(document).ready(function(){
	// Eliminate 300ms latency on touch devices
	FastClick.attach(document.body);

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
				$("#levelselector td.active").removeClass("active");
				$(this).addClass("active");
				
				if ($(this).hasClass("o4")) {
					// Custom range
					$("#customlevel").fadeIn(150);
				} else {
					// Set this as active
					var cr = Mathcercise.params.range;
					var nr = ($(this).attr("data-range")).split("-");
					Mathcercise.params.range = [ parseInt(nr[0]), parseInt(nr[1]) ];
				}
			} else {
				$(this).removeClass("active");
				Mathcercise.params.range = [null, null];
			}
			Mathcercise.checkIfReady();
		});
	});
	$("#dialogentry td").each(function(){
		$(this).click(function(){
			var entered = $("#entered").text();

			if (!$(this).attr("data-action") && entered.length < 2) {
				// Add number to entry
				var no = $(this).text();
				$("#entered").text(entered + no);
			} else {
				var action = $(this).attr("data-action");

				if (action == "done") {
					var digits = parseInt(entered);

					// Cancel entry
					if (entered.length == 0 || digits == 0) {
						$("#customlevel").fadeOut(150);
						$("#levelselector .o4").removeClass("active");
					} else if (isNaN(digits) || digits < 5 || digits > 10) {
						// Too large or too small
						$("#dialogtitle h3").text("5 to 10 only.");
						window.setTimeout(function(){ $("#dialogtitle h3").text("How many digits?") }, 2500);
					} else {
						// Set range
						var min = Math.pow(10, digits - 1),  // 1, 10, 100...
							max = Math.pow(10, digits) - 1;  // 9, 99, 999...
						Mathcercise.params.range = [min, max];
						Mathcercise.checkIfReady();
						$("#customlevel").fadeOut(150);
					}
				} else if (action == "delete") {
					// Remove last number
					$("#entered").text(entered.slice(0,-1));
				}
			}
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