'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            // $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response['error'] === true){
                    alert(response['message']);
                    $scope.dataLoading = false;
                }
                else
                {
                    AuthenticationService.SetCredentials(response);
                    $location.path('/');


                }
            });
        };
        $scope.goToRegister = function()
        {
            $location.path('/register');
        };
        $scope.register = function () {
            // $scope.dataLoading = true;
            AuthenticationService.Register($scope.firstName, $scope.lastName, $scope.email, $scope.affiliation, $scope.webPage, $scope.username, $scope.password, function(response) {
                // $location.path('/login');

            });
        };
    }]);