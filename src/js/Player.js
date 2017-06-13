define(['Spirit','Bullet'],function(Spirit,Bullet) {

	function Player(className) {

		//对象冒充
		Spirit.call(this, className);

		this.getDragAction();

		//创建一个保存子弹的数组
		this.bulletArr = [];
		//是否已经摧毁
		this.isCrashFlag = false;
		//保存摧毁图片的数组
		this.destoryArr = ['me_die1.png', 'me_die2.png', 'me_die3.png', 'me_die4.png'];
	}

	//原型链继承
	Player.prototype = new Spirit();

	//摧毁
	Player.prototype.destory = function(callback) {

		var oSelf = this;
		var count = 0;
		oSelf.destoryTimer = setInterval(function() {

			//修改背景图
			$(oSelf.ele).css('background', 'url(img/' + oSelf.destoryArr[count] + ')');

			count++;
			if(count == oSelf.destoryArr.length) {
				clearInterval(oSelf.destoryTimer);

				if(callback) {
					callback();
				}

			}

		}, 50);

	}

	//开火
	Player.prototype.fire = function(level) {

		var oSelf = this;

		//创建子弹
		setInterval(function() {
			//创建子弹
			var bullet = new Bullet('bullet');
			//计算子弹的初始位置
			var bulletLeft = $(oSelf.ele).position().left + ($(oSelf.ele).width() - $(bullet.ele).width()) / 2;
			var bulletTop = $(oSelf.ele).position().top - $(bullet.ele).height();

			$(bullet.ele).css({
				left: bulletLeft,
				top: bulletTop
			})

			bullet.attack();

			//保存子弹
			oSelf.bulletArr.push(bullet);

		}, 100 * level);

	}

	//获得拖拽功能
	Player.prototype.getDragAction = function() {

		var oSelf = this;

		$(oSelf.ele).on({
			mousedown: function(oEvent) {

				oSelf.disX = oEvent.offsetX;
				oSelf.disY = oEvent.offsetY;

				$(window).mousemove(function(oEvent) {

					var left = oEvent.clientX - oSelf.disX - $('.container').get(0).offsetLeft;
					var top = oEvent.clientY - oSelf.disY;
					//限制左右区域
					if(left <= 0) {
						left = 0;
					} else if(left >= $('.container').width() - $(oSelf.ele).width()) {
						left = $('.container').width() - $(oSelf.ele).width();
					}

					$(oSelf.ele).css({
						left: left,
						top: top
					})

				})

				$(window).mouseup(function() {

					$(window).off('mousemove mouseup');

				})

			}
		})

	}
	
	
	return Player;

})