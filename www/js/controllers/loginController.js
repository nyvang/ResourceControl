/**
 * LOGIN CONTROLLER 
 */
NyvangApp.controller('loginCtrl', function ($scope, $state) {

    var authProvider = "basic";
    var opts     = {'remember': true}; 

    var credentials = {
        'email'     : 'nn@smartpage.dk',
        'password'  : '1234'
    }

    $scope.authSuccess = function () {
        c("User logged in!");
        $state.go('main');
    };

    $scope.authFaliure = function (errors) {
        c("User rejected:");
        for (var err in errors) {
            c(err);
        }
    }

    $scope.login = function (provider) {
        Ionic.Auth.login(authProvider, opts, credentials)
            .then(authSuccess, authFaliure);
    };
})