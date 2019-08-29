module.exports = function() {

	var source       = 'src',
		development  = 'dist',
		test  	 	 = 'test',
		remove       = ['.sass-cache', 'dist'],

		// 템플릿 경로
		template = {
			// root  : source + '/views',
			// src  : source + '/views/**/!(_)*.html',
			// parts: source + '/views/**/_*.html',
			// dest : development + '/views',
			// dest_parts: development + '/views/**/include',
			src  : source + '/template/**/!(_)*.html',
			parts: source + '/template/**/_*.html',
			dest : development + '/views',
			dest_parts: development + '/views/**/include',
			src_m  : source + '/template_m/**/!(_)*.html',
			parts_m : source + '/template_m/**/_*.html',
			dest_m : development + '/views_m',
			dest_m_parts: development + '/views_m/**/include',
		},

		// Sass 경로
		sass = {
			src : source + '/sass/**/!(_)*.{scss,sass}',
			parts : source + '/sass/**/_*.{scss,sass}',
			// src       : source + '/sass/**',
			dest: development + '/public/css'
		},

		// Css 경로
		css = {
			src : source + '/css/**/*.css',
			// src : source + '/css/**',
			dest: development + '/public/css'
		},

		// JS 경로
		js = {
			src : source + '/js/**/*.js',
			// src : source + '/js/**',
			dest: development + '/public/js'
		},

		// Img 경로
		img = {
			// src : source + '/assets/img/**/*.{gif,jpg,png,ico}',
			src : source + '/assets/img/**/!(sprite)*/*',
			src_sprite : source + '/assets/img/**/sprite*/*',
			dest: development + '/assets/img',
		},

		// etc 경로
		etc = {
			src : source + '/assets/etc/**',
			dest: development + '/assets/etc',
		},

		// HTML 옵션
		htmlbeautify = {
			"indentSize": 4
		};

	return {
		del  : remove,
		src  : source,
		test : test,
		dev  : development,
		
		template : template,
		css  : css,
		sass : sass,
		js   : js,
		img   : img,
		etc   : etc,

		htmlbeautify : htmlbeautify
	};
};