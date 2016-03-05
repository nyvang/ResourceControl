// JS Entry point

// ! ! ! Temp removal of DB functionality ! ! !
// var db = null;
var storageE;

function c(l) {
  console.log();
}


// var nicolajsapp = angular.module('app', ['ionic']).run(function($ionicPlatform) {
var NyvangApp = angular.module('app', ['ionic'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        //db = window.sqlitePlugin.openDatabase({name: "resources.db"});

        if (storageAvailable('localStorage')) {
           console.log("Storage is available! App can run :)");
        }
        else {
          alert("Sorry, no storage available");
        }

    });

      /*
        Test if storage is available
      */
      function storageAvailable(type) {
          try {
              storageE = window[type],
                x = '__storage_test__';
              storageE.setItem(x, x);
              storageE.removeItem(x);
              return true;
          }
          catch(e) {
                return false;
          }
      }

  });

