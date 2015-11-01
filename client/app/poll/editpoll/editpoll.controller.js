'use strict';

angular.module('workspaceApp')
  .controller('EditpollCtrl', function ($scope, $routeParams, $http, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if($scope.isLoggedIn()) {
    	$scope.pollId = $routeParams.pollId;//"Hello World!";

	    // $http.get('/api/polls/' +  $scope.getCurrentUser()._id).success(function(polls) {
	    //   $scope.polls = polls;
	    // });
	}
  });
