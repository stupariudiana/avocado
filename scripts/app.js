'use strict';

// declare modules
angular.module('Conference', []);
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies',
    'Conference',

])


.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/register',{
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/register.html',
            hideMenus: true
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
        .when('/conference',{
            controller: 'ConferenceController',
            templateUrl: 'modules/conference/views/conference.html',
            hideMenus: true
        })
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })

 
        .otherwise({ redirectTo: '/register' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            // if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            //     $location.path('/login');
            // }
        });
    }]);