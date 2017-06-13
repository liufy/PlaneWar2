

//通过config可以设置加载的模块路径
require.config({
	
	paths:{
		'Spirit':'Father/Spirit'
	}
	
});

//引入使用到的各个模块
require(['jquery','GameDirector'],function($,GameDirector){
	
	//程序的入口
	$('.list li ').on({
		click:function(){
			//创建导演对象
			var director = new GameDirector( $(this).index() + 1 );
			//开始游戏
			director.startGame( );
		}
	})
	
})
