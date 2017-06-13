define(function() {
	function n(n) { n && (this.ele = $("<div></div>").appendTo(".container").addClass(n).get(0)) }
	return n
});