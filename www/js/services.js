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