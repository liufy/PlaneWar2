//引入gulp模块
var gulp = require('gulp');
//引入压缩html文件的模块
var htmlmin = require('gulp-htmlmin');
//引入压缩css文件的模块
var cssmin = require('gulp-minify-css');
//引入压缩js文件的模块
var jsmin = require('gulp-uglify');
//引入压缩image文件的模块
var imagemin = require('gulp-imagemin');

//html任务
gulp.task('htmlTask',function(){
	
	//任务具体的内容
	//src读取文件
	gulp.src('src/index.html')
	//执行htmlmin压缩代码
	.pipe(htmlmin({
			removeComments: true, //清除HTML注释
			collapseWhitespace: true, //压缩HTML
			collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
			minifyJS: true, //压缩页面JS
			minifyCSS: true //压缩页面CSS
		}))
	//保存的文件路径
	.pipe(gulp.dest('dist'));
	
})

//css任务
gulp.task('cssTask',function(){
	
	gulp.src('src/css/*.css').pipe(cssmin()).pipe(gulp.dest('dist/css'));
	
})

//js任务
gulp.task('jsTask',function(){
	
	gulp.src('src/js/*/*').pipe(jsmin()).pipe(gulp.dest('dist/js'));
	gulp.src('src/js/*').pipe(jsmin()).pipe(gulp.dest('dist/js'));
	
})

//压缩图片的任务
gulp.task('imageTask',function(){
	
	gulp.src('src/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
	
})

//设置一个默认任务
gulp.task('default',['htmlTask','cssTask','jsTask','imageTask']);
