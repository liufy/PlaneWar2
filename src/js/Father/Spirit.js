define(function() {

	//玩家飞机，敌机，子弹的父类
	function Spirit(className) {

		if(!className) {
			return;
		}

		//保存一个新节点
		this.ele = $('<div></div>').appendTo('.container').addClass(className).get(0);

	}

	return Spirit;
})