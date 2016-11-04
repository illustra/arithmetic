Mathcercise.game = {
	result: 0,

	generateTerm: function(min,max) {
		// Generate number within set range
		min = (typeof min !== 'undefined') ? min : Mathcercise.game.range().min;
		max = (typeof max !== 'undefined') ? max : Mathcercise.game.range().max;
		return Math.ceil(Math.random() * (max - min + 1)) + min;
	},
	begin: function(){
		this.mode();
		$("#result").text("");
		$("#check").removeClass("next");
		$("#check h2").text("check");
	},
	handler: function() {
		var result = Mathcercise.game.result;
		if (result != 0) {
			Mathcercise.game.result = 0;
			$("#result").text(result);
			console.log(result);
			$("#check").addClass("next");
			$("#check h2").text("next");
		} else {
			Mathcercise.game.mode();
			$("#result").text("");
			$("#check").removeClass("next");
			$("#check h2").text("check");
		}
	},

	// Get range
	currentRange: [5, 50],
	range: function() {
		var cur = this.currentRange;
		return { max: cur[0], min: cur[1] };
	},

	// Get mode
	currentMode: 0,
	mode: function() {
		var cur;
		switch (this.currentMode) {
			case 1:
				cur = 'add';
				break;
			case 2:
				cur = 'sub';
				break;
			case 3:
				cur = 'mul';
				break;
			case 4:
				cur = 'div';
				break;
			default:
				cur = 'add';
		}
		return Mathcercise.game.modes[cur]();
	},

	// Game modes
	modes: {
		add: function() {
			var gen = Mathcercise.game.generateTerm;
			var a1 = gen(), a2 = gen();
			Mathcercise.game.result = a1 + a2;
			$("#termOne").text(a1);
			$("#op").text("+");
			$("#termTwo").text(a2);
		},
		sub: function() {
			var gen = Mathcercise.game.generateTerm;
			var a1 = gen(), a2 = gen();

			if (a1 < a2) {         // No negative values allowed
				var a3 = a1;
				a1 = a2;
				a2 = a3;
			}

			Mathcercise.game.result = a1 - a2;
			$("#termOne").text(a1);
			$("#op").text("-");
			$("#termTwo").text(a2);
		},
		mul: function() {
			var gen = Mathcercise.game.generateTerm;
			var a1 = gen(), a2 = gen();
			Mathcercise.game.result = a1 * a2;
			$("#termOne").text(a1);
			$("#op").html("&times;");
			$("#termTwo").text(a2);
		},
		div: function() {
			var gen = Mathcercise.game.generateTerm;
			var a1 = gen(), a2 = gen();

			if (a1 < a2) {         // No negative values allowed
				var a3 = a1;
				a1 = a2;
				a2 = a3;
			}

			var remainder = a1 % a2;
			var wholeQuotient = Math.round((a1 / a2) - (remainder / a2));      // Sometimes we get 0.999999 instead of 1
			Mathcercise.game.result = (remainder != 0) ? wholeQuotient + " r " + remainder : wholeQuotient;
			$("#termOne").text(a1);
			$("#op").html("&divide;");
			$("#termTwo").text(a2);
		}
	}
};