//使用AMD规范
define(['Player','Enemy'],function(Player,Enemy) {
	
	console.log('嘻嘻嘻');
	console.log('我是主干');
	

	//导演
	function GameDirector(level) {

		//创建一个保存敌机的数组
		this.enemyArr = [];
		//保存游戏难度
		this.level = level;

	}

	//开始游戏
	GameDirector.prototype.startGame = function() {
		var oSelf = this;
		//所有的流程控制都在这个方法内部
		oSelf.loading(function() {

			oSelf.createPlayer();
			oSelf.createEnemy();
			oSelf.mapMoveing();
			oSelf.check();
			$('.score').show();
		});

	}

	GameDirector.prototype.mapMoveing = function() {

		var y = 0;
		setInterval(function() {
			//背景图向下移动
			$('.container').css('background-position-y', ++y);
		}, 30);
	}

	//创建玩家飞机
	GameDirector.prototype.createPlayer = function() {

		this.player = new Player('player');
		this.player.fire(this.level);
	}

	//创建敌机
	GameDirector.prototype.createEnemy = function() {

		var oSelf = this;

		setInterval(function() {

			var oNumber = Math.random();

			if(oNumber < 0.7) {
				var plane = new Enemy('plane1');
			} else if(oNumber < 0.9) {
				var plane = new Enemy('plane2');
			} else {
				var plane = new Enemy('plane3');
			}

			plane.attack();

			//保存敌机对象
			oSelf.enemyArr.push(plane);

		}, 1000);
	}

	//切换读取界面
	GameDirector.prototype.loading = function(callback) {

		//移除list
		$('.list').remove();
		//添加一个读取的标题
		var $title = $('<div class="title"></div>').appendTo('.container');
		//添加一个读取的小飞机
		var $loading = $('<div class="loading"></div>').appendTo('.container');

		var count = 1;
		var loadingTimer = setInterval(function() {
			count++;
			if(count == 4) {
				clearInterval(loadingTimer);

				//移除
				$title.remove();
				$loading.remove();

				//回调函数
				if(callback) {
					callback();
				}

				return;
			}
			$loading.css('background', 'url(img/loading' + count + '.png)');

		}, 200);
	}

	/*****************************碰撞检测*******************************/
	//每隔30毫秒，检测玩家飞机和敌机，或者是敌机和子弹是否发生了碰撞
	GameDirector.prototype.check = function() {

		//从数组中删除元素
		//arr = [1,2,3,3,5,6]
		//arr = [1,2,3,5,6]

		//arr = [1,2,3,3,5,6]
		//arr = [1,2,3,5,6]
		var oSelf = this;

		setInterval(function() {

			for(var i = oSelf.enemyArr.length - 1; i >= 0; i--) {
				//临时变量
				var enemy = oSelf.enemyArr[i];

				//如果这个属性为真，那么表示可以从数组中移除
				if(enemy.oDelete) {
					oSelf.enemyArr.splice(i, 1);
					continue;
				}

				//判断玩家飞机和敌机是否放生了碰撞
				if(oSelf.isCrash(enemy.ele, oSelf.player.ele) && oSelf.player.isCrashFlag == false) {
					oSelf.player.isCrashFlag = true;

					//摧毁
					oSelf.player.destory(function() {
						alert('GameOver');
						location.reload(true);

					});

				}
				//敌机和子弹是否发生了碰撞
				for(var j = oSelf.player.bulletArr.length - 1; j >= 0; j--) {
					//临时变量
					var bullet = oSelf.player.bulletArr[j];

					if(oSelf.isCrash(bullet.ele, enemy.ele) && bullet.isCrashFlag == false) {

						//移除节点
						//子弹摧毁
						bullet.isCrashFlag = true;
						bullet.destory();
						enemy.hurt();
					}

					//如果这个属性为真，那么表示可以从数组中移除
					if(bullet.oDelete) {
						oSelf.player.bulletArr.splice(j, 1);
						continue;
					}

				}

			}
		}, 30)

	}

	//判断2个单位是否发生了碰撞
	GameDirector.prototype.isCrash = function(node1, node2) {

		//jquery开支很大，这里的判断
		var left1 = node1.offsetLeft;
		var top1 = node1.offsetTop;
		var width1 = node1.offsetWidth;
		var height1 = node1.offsetHeight;

		var left2 = node2.offsetLeft;
		var top2 = node2.offsetTop;
		var width2 = node2.offsetWidth;
		var height2 = node2.offsetHeight;

		//left2 + width2 > left1  left1 + width1 > left2

		if(left2 - width1 < left1 && left1 < left2 + width2 &&
			top2 - height1 < top1 && top1 < top2 + height2) {
			//返回true表示发生了碰撞
			return true;
		}
		//返回false表示没有发生碰撞
		return false;
	}

	return GameDirector;

})