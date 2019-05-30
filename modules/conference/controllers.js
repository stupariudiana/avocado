'use strict';

angular.module('Conference')
    .controller('ConferenceController',
        ['$scope', '$rootScope', 'ConferenceService',
            function ($scope, $rootScope, ConferenceService) {
                $scope.userType = $rootScope.globals.currentUser['affiliation'];
                $scope.conferenceName = $rootScope.selectedConference.name;
                $scope.abstractDeadline = $rootScope.selectedConference.abstractDeadline;
                $scope.proposalDeadline = $rootScope.selectedConference.proposalDeadline;
                $scope.paperType = 'abstract / final';
                $scope.proposals =[];
                $scope.usersYes ={};
                $scope.usersMaybe =[];
                $scope.onSubmitProposal = onSubmitProposal;
                $scope.getAvailableProposals = getAvailableProposals;
                $scope.setBid = setBid;
                $scope.clicked = {};
                $scope.getBidersWithYes = getBidersWithYes;
                $scope.getBidersWithMaybe = getBidersWithMaybe;
                function getAvailableProposals()
                {
                    ConferenceService.getConferencesById($rootScope.selectedConference.id, function (response) {
                        $rootScope.proposals = response['proposals'];
                        $scope.proposals = $rootScope.proposals;
                    });
                }
                function onSubmitProposal(paperName, paperKeyWords, paperText, paperFinalPaper, paperType) {
                    var f = document.getElementById('paperFinalPaper').files[0],
                        r = new FileReader();

                    var data;
                    r.onloadend = function(e) {
                        data = e.target.result;
                        //send your binary data via $http or $resource or do anything else with it
                    };

                    r.readAsArrayBuffer(f);

                    if (paperType === 'abstract') {
                        paperType = false;
                    }
                    else if (paperType === 'final') {
                        paperType = true;
                    }

                    ConferenceService.addProposal(paperName, paperKeyWords, paperText, data, paperType, function (response) {

                    });

                }
                function setBid(result,id) {

                    $scope.clicked[id] = 1;
                    ConferenceService.addBid(result, id,  function (response) {

                    });
                }
                function getBidersWithYes(proposal)
                {
                    ConferenceService.getBidersWithYes(proposal.id, function (response) {
                        var pos = $scope.proposals.indexOf(proposal);
                        $scope.proposals[pos].yesProposals = response;
                    });
                }

                function getBidersWithMaybe(proposal)
                {
                    ConferenceService.getBidersWithMaybe(proposal.id, function (response) {
                        var pos = $scope.proposals.indexOf(proposal);
                        $scope.proposals[pos].maybeProposals = response;
                    });
                }
            }]);