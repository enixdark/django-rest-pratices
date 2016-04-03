(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function ($) {
	function csrfSafeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
		);
	}
	$.ajaxSetup({
		beforeSend: function beforeSend(xhr, settings) {
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		}
	});
	var csrftoken = Cookies.get('csrftoken');

	$(".follow-btn").click(function () {
		var username = $(this).attr('username');
		var follow = $(this).attr('value') != "True";
		$.ajax({
			url: '/tweets/user/' + username + "/profile/",
			type: 'POST',
			data: { username: username, follow: follow }
		}).done(function () {
			console.log("success");
			window.location.reload();
		}).fail(function () {
			console.log("error");
		}).always(function () {
			console.log("complete");
		});
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvcHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixhQUFLOztBQUUzQixHQUFFLGFBQUYsRUFBaUIsS0FBakIsQ0FBdUIsWUFBTTtBQUM1QixNQUFJLFdBQVcsYUFBUSxJQUFSLENBQWEsVUFBYixDQUFYLENBRHdCO0FBRTVCLE1BQUksU0FBUyxhQUFRLElBQVIsQ0FBYSxPQUFiLEtBQXlCLE1BQXpCLENBRmU7QUFHNUIsSUFBRSxJQUFGLENBQU87QUFDTixRQUFLLGtCQUFrQixRQUFsQixHQUE2QixXQUE3QjtBQUNMLFNBQU0sTUFBTjtBQUNBLFNBQU0sRUFBQyxVQUFVLFFBQVYsRUFBb0IsUUFBUSxNQUFSLEVBQTNCO0dBSEQsRUFLQyxJQUxELENBS00sWUFBTTtBQUNYLFdBQVEsR0FBUixDQUFZLFNBQVosRUFEVztBQUVYLFVBQU8sUUFBUCxDQUFnQixNQUFoQixHQUZXO0dBQU4sQ0FMTixDQVNDLElBVEQsQ0FTTSxZQUFNO0FBQ1gsV0FBUSxHQUFSLENBQVksT0FBWixFQURXO0dBQU4sQ0FUTixDQVlDLE1BWkQsQ0FZUSxZQUFNO0FBQ2IsV0FBUSxHQUFSLENBQVksVUFBWixFQURhO0dBQU4sQ0FaUixDQUg0QjtFQUFOLENBQXZCLENBRjJCO0NBQUwsQ0FBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KCQgPT4ge1xuXHRcblx0JChcIi5mb2xsb3ctYnRuXCIpLmNsaWNrKCgpID0+IHtcblx0XHR2YXIgdXNlcm5hbWUgPSAkKHRoaXMpLmF0dHIoJ3VzZXJuYW1lJyk7XG5cdFx0dmFyIGZvbGxvdyA9ICQodGhpcykuYXR0cigndmFsdWUnKSAhPSBcIlRydWVcIjtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiAnL3R3ZWV0cy91c2VyLycgKyB1c2VybmFtZSArIFwiL3Byb2ZpbGUvXCIsXG5cdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRkYXRhOiB7dXNlcm5hbWU6IHVzZXJuYW1lLCBmb2xsb3c6IGZvbGxvd31cblx0XHR9KVxuXHRcdC5kb25lKCgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHR9KVxuXHRcdC5mYWlsKCgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG5cdFx0fSlcblx0XHQuYWx3YXlzKCgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG5cdFx0fSk7XG5cdH0pO1xuXG59KTsiXX0=
