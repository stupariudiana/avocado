'use strict';

angular.module('Home')
    .controller('HomeController',
        ['$scope', '$rootScope', 'ConferenceService', '$location',
            function ($scope, $rootScope, ConferenceService, $location) {
                $scope.firstName = $rootScope.globals.currentUser['firstName'];
                $scope.lastName = $rootScope.globals.currentUser['lastName'];
                $scope.existsConferences = false;
                $scope.conferences = [];
                getConferences();
                $scope.seeConference = seeConference;

                function seeConference(conference) {
                    $rootScope.selectedConference = conference;
                    $location.path('/conference');

                }

                function getConferences() {
                    ConferenceService.getConferences(function (response) {
                        if (response.length !== 0)
                            $scope.existsConferences = true;
                        $scope.conferences = response;
                        $rootScope.conferences = response;
                    });
                }
            }]);