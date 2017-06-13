define(['Spirit'],function(Spirit) {

	function Enemy(className) {

		Spirit.call(this, className);

		//设置初始位置
		$(this.ele).css({
			left: parseInt(Math.random() * ($('.container').width() - $(this.ele).width())),
			top: -$(this.ele).height()
		})

		if(className == 'plane1') {
			this.speed = 10;
			this.hp = 2;
			this.score = 2;
			this.destoryArr = ['plane1_die1.png', 'plane1_die2.png', 'plane1_die3.png'];
		} else if(className == 'plane2') {
			this.speed = 5;
			this.hp = 5;
			this.score = 5;
			this.destoryArr = ['plane2_die1.png', 'plane2_die2.png', 'plane2_die3.png', 'plane2_die4.png'];
		} else if(className == 'plane3') {
			this.speed = 2;
			this.hp = 15;
			this.score = 15;
			this.destoryArr = ['plane3_die1.png', 'plane3_die2.png', 'plane3_die3.png', 'plane3_die4.png', 'plane3_die5.png', 'plane3_die6.png'];
		}
	}

	Enemy.prototype = new Spirit();

	//掉hp
	Enemy.prototype.hurt = function() {

		var oSelf = this;
		//hp为0的时候，才能摧毁飞机
		if(--oSelf.hp == 0) {
			oSelf.destory();
		}

	}

	//摧毁
	Enemy.prototype.destory = function() {

		var oSelf = this;
		var count = 0;

		//如何从数组中移除这个节点所对应的对象
		oSelf.oDelete = true;

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

				//计分
				$('.score').html($('.score').html() * 1 + oSelf.score);

			}

		}, 50);

	}

	Enemy.prototype.attack = function() {

		var oSelf = this;
		oSelf.attackTimer = setInterval(function() {

			$(oSelf.ele).css('top', $(oSelf.ele).position().top + oSelf.speed);
			//飞出屏幕，需要移除
			// -300为了保证不会撞上任何出现的敌机
			if($(oSelf.ele).position().top > $(window).height()) {

				//如何从数组中移除这个节点所对应的对象
				oSelf.oDelete = true;

				//停止定时器
				clearInterval(oSelf.attackTimer);
				//移除
				$(oSelf.ele).remove();

			}

		}, 30);

	}

	return Enemy;
})