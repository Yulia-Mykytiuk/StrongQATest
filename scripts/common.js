'use strict';

var global_hours = "0";
var global_minutes = "3";
var global_seconds = "1";

function timer(hours, minutes, seconds) {
	var time = {
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds
	};

	var interval = setInterval(function () {

		if (time.hours.toString().length < 2) {
			time.hours = '0' + time.hours;
		}
		if (time.minutes.toString().length < 2) {
			time.minutes = '0' + time.minutes;
		}
		if (time.seconds.toString().length < 2) {
			time.seconds = '0' + time.seconds;
		}

		$('.hours span').html(time.hours);
		$('.min span').html(time.minutes);
		$('.sec span').html(time.seconds);
		time.seconds--;

		$('.time span').each(function () {
			if ($(this).html() == '00') {
				$(this).addClass('disabled');
			}
		});

		if (time.seconds === 0) {
			if (time.minutes > 0) {
				time.minutes--;
				time.seconds = 59;
			} else if (time.minutes === 0) {
				if (time.hours > 0) {
					time.hours--;
					time.minutes = 59;
				}
			}
		} else if (time.seconds < 0) {
			clearInterval(interval);
			$('.el-button').remove();
			time.seconds = '00';
		}
	}, 1000);
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		expires: -1
	});
}

$(document).ready(function () {

	setTimeout(function () {
		$('.timer-content').addClass('active');
	}, 900);


	alert(document.cookie);

	var start_time = Date.now();

	if (!document.cookie && !getCookie('start-timer').length) {
		timer(global_hours, global_minutes, global_seconds);
		var now = Date.now();
		setCookie('start-timer', now, {
			expires: 1
		});
		var end_time = now + (global_hours*3600 + global_minutes*60 + global_seconds);
		setCookie('end-timer', end_time, {
			expires: 1
		});
	} else if (start_time >= getCookie('end-timer')) {
		timer('0', '0', '0');
	} else if (start_time < getCookie('end-timer')) {
		var left = getCookie('end-timer') - start_time;
		var hours = Math.ceil(left / 3600);
		var minutes = Math.ceil((left - hours*3600) / 60);
		var seconds = Math.ceil(left - ((left - hours*3600) / 60));
		timer(hours, minutes, seconds);
	}

});

$(window).load(function () {});

$(window).resize(function () {});