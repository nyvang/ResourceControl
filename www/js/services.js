NyvangApp.factory('dataService', [function(){
	var dataSerivceInstance = {
		set: function(key, value) {
		    if (!key || !value) {return;}

		    if (typeof value === "object") {
		        value = JSON.stringify(value);
		    }
		    localStorage.setItem(key, value);
		},
		get: function(key) {
		    var value = localStorage.getItem(key);

		    if (!value) {return;}

		    // assume it is an object that has been stringified
		 /*   if (value[0] === "{") {
		        value = JSON.parse(value);
		    }*/

		    return value;
		}
	}
	return dataSerivceInstance;

}])

/*
  DeviceInfo finds the width and height of the current device.
  Use deviceInfo.width or deviceInfo.height
  @ return: number (in px)
*/
.factory('deviceInfo', [function() {
	var width, height;
	var deviceDiscovery = {

		width: function() {
			if (typeof (window.innerWidth) == 'number') {
			    windowWidth = window.innerWidth;
			      
			} else if (document.documentElement && document.documentElement.clientWidth) {
			    windowHeight = document.documentElement.clientHeight;
			    windowWidth = document.documentElement.clientWidth;
			     
			} else if (document.body && document.body.clientWidth) {
			   windowWidth = document.body.clientWidth;
			}
			return windowWidth;
		},
		height: function() {
			if (typeof (window.innerWidth) == 'number') {
			    windowHeight = window.innerHeight;
			      
			} else if (document.documentElement && document.documentElement.clientHeight) {
			    windowHeight = document.documentElement.clientHeight;
			     
			} else if (document.body && document.body.clientHeight) {
			   windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		}

	}
	return deviceDiscovery;
}])


/*
  DateService "convert" a month number into its string representation.
  @ param: number (from 0-11)
  @ return: MonthString i.e. January, February etc.
*/
.service('dateService', [function(){
	this.toMonthString = function(monthNo) {
		var monthString = "";

		switch (monthNo) {
			case 0:
				monthString = 'January';
				break;
			case 1:
				monthString = 'Februar';
				break;
			case 2:
				monthString = 'Marts';
				break;
			case 3:
				monthString = 'April';
				break;
			case 4:
				monthString = 'May';
				break;
			case 5:
				monthString = 'June';
				break;
			case 6:
				monthString = 'July';
				break;
			case 7:
				monthString = 'August';
				break;
			case 8:
				monthString = 'Septmber';
				break;
			case 9:
				monthString = 'Oktober';
				break;
			case 10:
				monthString = 'November';
				break;
			case 11:
				monthString = 'December';
				break;
		}
		return monthString;
	}
}]);
