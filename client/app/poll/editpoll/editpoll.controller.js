'use strict';

angular.module('workspaceApp')
  .controller('EditpollCtrl', function ($scope, $routeParams, $http, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if($scope.isLoggedIn()) {
    	$scope.pollId = $routeParams.pollId;

	    $http.get('/api/polls/' +  $scope.pollId).success(function(poll) {
		  $scope.poll = poll;
		 });

	    $http.get('/api/choices/').success(function(choices) {
	      $scope.choices = choices;
	    });
	}
  });
