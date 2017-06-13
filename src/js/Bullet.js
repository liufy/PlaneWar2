define(['Spirit'] , function(Spirit) {

	function Bullet(className) {

		Spirit.call(this, className);

		//设定速度
		this.speed = -10;
		this.isCrashFlag = false;

		this.destoryArr = ['die1.png', 'die2.png'];
	}

	Bullet.prototype = new Spirit();

	//摧毁
	Bullet.prototype.destory = function(callback) {

		var oSelf = this;
		var count = 0;
		//修改class
		$(oSelf.ele).attr('class', 'bullet_die');

		oSelf.destoryTimer = setInterval(function() {

			//修改背景图
			$(oSelf.ele).css('background', 'url(img/' + oSelf.destoryArr[count] + ')');

			count++;
			if(count == oSelf.destoryArr.length) {
				//停止定时器
				clearInterval(oSelf.destoryTimer);
				clearInterval(oSelf.attackTimer);
				//移除节点
				$(oSelf.ele).remove();

				//如何从数组中移除这个节点所对应的对象
				oSelf.oDelete = true;

				if(callback) {
					callback();
				}

			}

		}, 50);

	}

	//子弹移动
	Bullet.prototype.attack = function(callback) {

		var oSelf = this;
		oSelf.attackTimer = setInterval(function() {

			$(oSelf.ele).css('top', $(oSelf.ele).position().top + oSelf.speed);
			//飞出屏幕，需要移除
			// -300为了保证不会撞上任何出现的敌机
			if($(oSelf.ele).position().top < -300) {

				oSelf.oDelete = true;

				//停止定时器
				clearInterval(oSelf.attackTimer);
				//移除
				$(oSelf.ele).remove();

			}

		}, 30);

	}

	return Bullet;

})