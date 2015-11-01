'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if($scope.isLoggedIn()) {
	    $http.get('/api/polls/' +  $scope.getCurrentUser()._id).success(function(polls) {
	      $scope.polls = polls;
	    });
	}
  });
