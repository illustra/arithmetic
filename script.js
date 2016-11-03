var check = false;
$(document).ready(function(){
	// Handlers
	$("#control").click(calc.handler);
	$("a").click(function(){
		var rangeStr = ($(this).attr("data-range")).split(",");
		var min = parseInt(rangeStr[0]), max = parseInt(rangeStr[1]);
		calc.range = {
			min: min,
			max: max
		}
		console.log(min,max);
		$("#selector").animate({marginTop: '-100%'}, 400);
		calc.handler(100);
	});
	$("#main").click(function(){ $("#selector").animate({marginTop: '0'}, 400); });
});

var calc = {
	sum: 0,
	check: true,
	range: {
		min: 0,
		max: 0
	},
	handler: function() {
		this.check = !this.check;
		if (this.check) {
			var sum = calc.sum;
			$("#result").text(sum);
			console.log(sum);
			$("#control").text("next");
		} else {
			calc.generate();
			$("#result").text("");
			$("#control").text("check");
		}
	},
	generate: function() {
		var gen = function() { return Math.ceil(Math.random() * (calc.range.max - calc.range.min + 1)) + calc.range.min };
		var a1 = gen(), a2 = gen();
		this.sum = a1 + a2;
		$("#addendOne").text(a1);
		$("#addendTwo").text(a2);
	}
};