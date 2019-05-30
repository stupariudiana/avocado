'use strict';

angular.module('Conference')

    .factory('ConferenceService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
                var service = {};
                var link = 'http://192.168.1.15:8000';
                service.addProposal = function (paperName, paperKeyWords, paperText, paperFinalPaper, paperType, callback) {
                    $http.post(link+'/addProposal', {conferenceId: $rootScope.selectedConference.id, userId:$rootScope.globals.currentUser['id'], name: paperName, keyWords: paperKeyWords, text: paperText, finalPaper: paperFinalPaper, type: paperType })
                        .success(function (response) {
                            callback(response);
                        });

                };
                service.getConferences = function (callback) {
                    $http.post(link + '/getConferences', {})
                        .success(function (response) {
                            callback(response);
                        });

                };
                service.getConferencesById = function (id,callback) {
                    $http.post(link + '/getConferenceById/id/'+id, {})
                        .success(function (response) {
                            callback(response);
                        });

                };

                service.addBid = function (result, id) {
                    $http.post(link+'/addBid', {userId: $rootScope.globals.currentUser['id'], proposalId: id, result: result })
                        .success(function (response) {
                            callback(response);
                        });

                };

                service.getBidersWithYes = function (proposalId,callback) {
                    $http.post(link + '/getBidersWithYes/proposalId/'+proposalId, {})
                        .success(function (response) {
                            callback(response);
                        });

                };

                service.getBidersWithMaybe = function (proposalId, callback) {
                    $http.post(link + '/getBidersWithMaybe/proposalId/'+proposalId, {})
                        .success(function (response) {
                            callback(response);
                        });

                };

                return service;
            }]);