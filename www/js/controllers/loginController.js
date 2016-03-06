/**
 * LOGIN CONTROLLER 
 */
NyvangApp.controller('loginCtrl', ['$scope', '$state', '$window',
    function ($scope, $state, $win) {
        const delay = 200;

        var authProvider = "basic";
        var opts = { 'remember': false };

        var details = {};

        $scope.user = {};
        $scope.user.name = "";
        $scope.user.email = "";
        $scope.user.password = "";

        $scope.gotoSignup = function () {
            $state.go('signup');
        }

        authSuccess = function () {
            $state.go('menu.main');
        };

        authFailure = function (errors) {
            for (var err in errors) {
                c(err);
            }
        }

        signupSuccess = function () {
            $scope.result = "Success !";
            $win.setTimeout(
                function () {
                    $state.go('login');
                }, delay);
        };

        signupFailure = function (errors) {
            for (var err in errors) {
                c(err);
            }
        };

        $scope.signup = function () {
            details = {
                'email': $scope.user.email,
                'password': $scope.user.password
            }
            details.custom = {
                'name': $scope.user.name
            }
            Ionic.Auth.signup(details)
                .then(signupSuccess, signupFailure)
        };

        /*
         * LOGIN 
         */
        $scope.login = function (provider) {
            details = {
                'email': $scope.user.email,
                'password': $scope.user.password
            }
            Ionic.Auth.login(authProvider, opts, details)
                .then(authSuccess, authFailure);
        };
    }]);