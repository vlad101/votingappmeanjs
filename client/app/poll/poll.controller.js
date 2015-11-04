'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, $location, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    

    // view all polls by user id
    if($location.path().endsWith('/all')) {
        if($scope.isLoggedIn()) {
    	    $http.get('/api/polls/user/' +  $scope.getCurrentUser()._id).success(function(polls) {
    	      $scope.polls = polls;
    	    });

		   // Button ng-click to go to specific path
		    // ** special case ng-click inside ng-repeat **
			$scope.go = function (pollId) {
		      $location.path('/polls/' + pollId + '/edit');
		    };

		    // Delete poll with its choices
	        $scope.removePoll = function (poll, index) {

			    if(!poll)
			      return;
	            $http.delete("/api/polls/" + poll._id)
	              .then(function successCallback(response) {
	              		  $http.delete("/api/choices/poll/" + poll._id)
			              .then(function successCallback(response) {
			              $scope.polls.splice(index, 1);
		           }, function errorCallback(response) { alert("Could not delete choices, try again!"); });
	            }, function errorCallback(response) { alert("Could not delete poll, try again!"); });
	      	};

        } else {
    	    $http.get('/api/polls/user/' +  $routeParams.userId).success(function(polls) {
    	      $scope.polls = polls;
    	    });
        }
    } 

    	// get poll id from the url
    if($routeParams.pollId) {
      	$scope.pollId = $routeParams.pollId;
  	
  			// get poll by poll id
  	    $http.get('/api/polls/' +  $scope.pollId).success(function(poll) {
  		  $scope.poll = poll;
  		 });
  
  			// get choices by poll id
  	    $http.get('/api/choices/poll/' +  $scope.pollId).success(function(choices) {
  	      $scope.choices = choices;
  	    });
    }
    
    // must be logged in to edit polls and choices
    if($scope.isLoggedIn()) {
	      if($location.path().endsWith('/edit')) {   // edit poll by poll id
	      
		    // Add choice
		            
		    // Form add choice
	      $scope.addChoiceForm = {
	        choice: ""
	       };
	        
		    $scope.addChoice = function () {
		      
	    	    if(!$scope.addChoiceForm.choice)
	    	      return;
		      
		        var choice = {
		          "poll_id" : $scope.pollId,
		          "choice_text": $scope.addChoiceForm.choice,
		          "vote_count" : 0,
		          "active" : true
		        };
		        
		        $http.post("/api/choices", choice)
		        .then(function successCallback(response) {
		            $scope.choices.push(response.data);
		          }, function errorCallback(response) { alert("Could not add choice, try again!"); });
		        $scope.addChoiceForm.choice = "";
		    
		    };

		    // Update choice
	        $scope.updateChoice = function (choice) {

		      if(!choice.choice_text)
		        return;

	            $http.put("/api/choices/" + choice._id, choice)
	              .then(function successCallback(response) {}, 
	            function errorCallback(response) { alert("Could not update choice, try again!"); });
	      	};

		    // Delete choice
	        $scope.removeChoice = function (choice, index) {

		      if(!choice.choice_text)
		        return;

	            $http.delete("/api/choices/" + choice._id)
	              .then(function successCallback(response) {
	              	$scope.choices.splice(index, 1);
	              }, function errorCallback(response) { alert("Could not delete choice, try again!"); });
	      	};
	    }
	}
})
.run(function ($rootScope, $location) {

    var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

});
