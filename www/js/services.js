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
		    if (value[0] === "{") {
		        value = JSON.parse(value);
		    }

		    return value;
		}
	}
	return dataSerivceInstance;

}])

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

.service('coolService', [function(){
/*
	this.set = function(key, value) {
	    if (!key || !value) {return;}

	    if (typeof value === "object") {
	      value = JSON.stringify(value);
	    }
	    localStorage.setItem(key, value);
	}

	this.get = function(key) {
	    var value = localStorage.getItem(key);
	    if (!value) {return;}

	    // check if the object has been stringified
	    if (value[0] === "{") {
	      value = JSON.parse(value);
	    }
	    return value;
	}
*/
}]);


/*

var data = {
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
    if (value[0] === "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}
*/