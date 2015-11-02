'use strict';

angular.module('workspaceApp')
  .controller('EditpollCtrl', function ($scope, $routeParams, $http, Auth) {
    
    /* Form add choice */
    $scope.addChoiceForm = {
        choice: ""
    };
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if($scope.isLoggedIn()) {
    	
    	// get poll id from the url
    	$scope.pollId = $routeParams.pollId;
	
			// get poll by poll id
	    $http.get('/api/polls/' +  $scope.pollId).success(function(poll) {
		  $scope.poll = poll;
		 });

			// get choices by poll id
	    $http.get('/api/choices/poll/' +  $scope.pollId).success(function(choices) {
	      $scope.choices = choices;
	    });
	    
	    $scope.addChoice = function () {
	      
	      if(!$scope.addChoiceForm.choice)
	        return;
	      
        var choice = {
          "poll_id" : $scope.pollId,
          "choice_text": $scope.addChoiceForm.choice,
          "vote_count" : 0,
          "active" : true
        };
        
        $http.post("/api/choices",choice)
        .then(function successCallback(response) {
            $scope.choices.push(response.data);
          }, function errorCallback(response) {alert("Could not add choice, try again!");});
        $scope.addChoiceForm.choice = "";
    
      };
      
		}
  });
