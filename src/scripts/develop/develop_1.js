function timer(hours, minutes, seconds) {
	var time = {
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};

	var interval = setInterval(function() {

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

		$('.time span').each(function() {
			if ($(this).html() == '00') {
				$(this).addClass('disabled');
			}
		});

		if (time.seconds === 0) {
			if (time.minutes > 0) {
				time.minutes--;
				time.seconds = 59;
			} else if (time.minutes === 0) {
		    	if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
		    		clearInterval(interval);
		    		$('.el-button').remove();
		    	} else if (time.hours > 0) {
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
    for(var i = 0; i <ca.length; i++) {
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
  })
}

$(document).ready(function(){
	// alert( document.cookie, getCookie('hours'), getCookie('minutes') );
	setTimeout(function() {
		$('.timer-content').addClass('active');
	}, 900);

	var cur_hours = $('.hours span').html();
	var cur_minutes = $('.min span').html();
	var cur_seconds = $('.sec span').html();

	if (!cur_hours || cur_hours == NaN || cur_hours == undefined || cur_hours == "") {
	  	cur_hours = 0;
	  }

	  if (!cur_minutes || cur_minutes == NaN || cur_minutes == undefined || cur_minutes == "") {
	  	cur_minutes = 0;
	  }

	  if (!cur_seconds || cur_seconds == NaN || cur_seconds == undefined || cur_seconds == "") {
	  	cur_seconds = 0;
	  }

	if (document.cookie && getCookie('hours').length || getCookie('minutes').length || getCookie('seconds').length) {
		timer(parseInt(getCookie('hours')), parseInt(getCookie('minutes')), parseInt(getCookie('seconds')));
	} else {
		timer(cur_hours, cur_minutes, cur_seconds);
	}

	windowCloseEvent();
});


function windowCloseEvent() {
    window.onbeforeunload = function(event) {
	    var cur_hours = $('.hours span').html();
		var cur_minutes = $('.min span').html();
		var cur_seconds = $('.sec span').html();

		if (!cur_hours || cur_hours == NaN || cur_hours == undefined || cur_hours == "") {
			cur_hours = 0;
		}

		if (!cur_minutes || cur_minutes == NaN || cur_minutes == undefined || cur_minutes == "") {
			cur_minutes = 0;
		}

		if (!cur_seconds || cur_seconds == NaN || cur_seconds == undefined || cur_seconds == "") {
			cur_seconds = 0;
		}

		deleteCookie('hours');
		deleteCookie('minutes');
		deleteCookie('seconds');

		document.cookie = "hours=" + cur_hours + ";";
		document.cookie = "minutes=" + cur_minutes + ";";
		document.cookie = "seconds=" + cur_seconds + ";";
	}
}

$(window).load(function(){

});

$(window).resize(function(){

});