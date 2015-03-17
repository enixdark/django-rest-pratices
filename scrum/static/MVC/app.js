// var app = (function ($) {


// 	var config = $('#config');
// 	var _app = JSON.parse(config.text());

// 	$(document).ready(function () {
// 		var router = new app.router();
// 	});
// 	return _app;
// }(jQuery);

var app = (function ($) {
	var config = $('#config'),
	app = JSON.parse(config.text());
	$(document).ready(function () {
		var router = new app.router();
	});
	return app;
})(jQuery);
