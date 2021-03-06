'use strict';

var global_hours = 0;
var global_minutes = 3;
var global_seconds = 1;

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

$(document).ready(function () {

	setTimeout(function () {
		$('.timer-content').addClass('active');
	}, 900);

	var start_time = Date.now();

	if (!document.cookie) {

		var date = new Date();
		date.setHours(date.getHours() + 1);

		timer(global_hours, global_minutes, global_seconds);

		var now = Date.now();
		document.cookie = 'start-timer=' + now + '; path=/; expires=' + date.toUTCString();

		var end_time = parseInt(now) + (global_hours*3600000 + global_minutes*60000 + global_seconds*1000);
		document.cookie = 'end-timer=' + end_time + '; path=/; expires=' + date.toUTCString();

	} else if (start_time >= parseInt(getCookie('end-timer'))) {

		timer('0', '0', '0');

	} else if (start_time < parseInt(getCookie('end-timer'))) {

		var left = parseInt(getCookie('end-timer')) - parseInt(start_time);
		var hours = Math.floor(left / 3600000);
		var minutes = Math.floor((left - hours*3600000) / 60000);
		var seconds = Math.floor((left - hours*3600000 - minutes*60000) / 1000);

		timer(hours, minutes, seconds);

	}

});