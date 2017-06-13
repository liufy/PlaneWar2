define(["Spirit"], function(e) {
	function t(t) { e.call(this, t), this.speed = -10, this.isCrashFlag = !1, this.destoryArr = ["die1.png", "die2.png"] }
	return t.prototype = new e, t.prototype.destory = function(e) {
		var t = this,
			r = 0;
		$(t.ele).attr("class", "bullet_die"), t.destoryTimer = setInterval(function() { $(t.ele).css("background", "url(img/" + t.destoryArr[r] + ")"), ++r == t.destoryArr.length && (clearInterval(t.destoryTimer), clearInterval(t.attackTimer), $(t.ele).remove(), t.oDelete = !0, e && e()) }, 50)
	}, t.prototype.attack = function(e) {
		var t = this;
		t.attackTimer = setInterval(function() { $(t.ele).css("top", $(t.ele).position().top + t.speed), $(t.ele).position().top < -300 && (t.oDelete = !0, clearInterval(t.attackTimer), $(t.ele).remove()) }, 30)
	}, t
});