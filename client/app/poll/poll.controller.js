'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, $location, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.host = $location.host();
    $scope.publicUrl = true;

    // view all polls by user id
    if($location.path().endsWith('/all')) {
        if($scope.isLoggedIn()) {
        	
        	// Get polls by random user id through url
	    	if($routeParams.userId) {
	    	    $http.get('/api/polls/user/' +  $routeParams.userId).success(function(polls) {
	    	      $scope.polls = polls;
	    	    });
	    	} else {
	        	// Get polls by current user id
	        	$http.get('/api/polls/user/' +  $scope.getCurrentUser()._id).success(function(polls) {
		    	      $scope.polls = polls;
		    	});
	    	}
	    	
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
			              $scope.pollRemove = "Poll Deleted";
		           }, function errorCallback(response) { 
		           	$scope.pollRemove = "Could not delete choices, try again!"; 
		           });
	            }, function errorCallback(response) { 
	            	$scope.pollRemove = "Could not delete poll, try again!"; 
	            });
	      	};

        } else {
    	    $http.get('/api/polls/user/' +  $routeParams.userId).success(function(polls) {
    	      $scope.polls = polls;
    	    });
        }
    } 

    	// get poll id from the url (logged in and not logged in user)
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
	      
	      $scope.publicUrl = false;
	      
		    // Update poll
	        $scope.updatePoll = function (poll) {

		    $scope.pollUpdate = "";
		    $scope.choiceAdd = "";
		    $scope.choiceUpdate = "";
		    $scope.choiceRemove = "";

		      if(!poll.question)
		        return;

	            $http.put("/api/polls/" + poll._id, poll)
	              .then(function successCallback(response) {
	              	$scope.pollUpdate = "Updated Title!";
	              }, 
	            function errorCallback(response) { 
	            	$scope.pollUpdate = "Could not update poll title, try again!"; 
	            });
	      	};
	      
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
		            $scope.choiceAdd = "Added choice!";
		          }, function errorCallback(response) { 
		          	$scope.choiceAdd = "Could not add choice, try again!";
		          });
		        $scope.addChoiceForm.choice = "";
		    
		    };

		    // Update choice
	        $scope.updateChoice = function (choice) {

			    $scope.pollUpdate = "";
			    $scope.choiceAdd = "";
			    $scope.choiceUpdate = "";
			    $scope.choiceRemove = "";

		      if(!choice.choice_text)
		        return;

	            $http.put("/api/choices/" + choice._id, choice)
	              .then(function successCallback(response) {
	              	$scope.choiceUpdate = "Updated Choice!";
	              }, 
	            function errorCallback(response) { 
	            	$scope.choiceUpdate = "Could not update choice, try again!"; 
	            });
	      	};

		    // Delete choice
	        $scope.removeChoice = function (choice, index) {

			    $scope.pollUpdate = "";
			    $scope.choiceAdd = "";
			    $scope.choiceUpdate = "";
			    $scope.choiceRemove = "";

		      if(!choice.choice_text)
		        return;

	            $http.delete("/api/choices/" + choice._id)
	              .then(function successCallback(response) {
	              	$scope.choices.splice(index, 1);
	              	$scope.choiceRemove = "Deleted Choice!";
	              }, function errorCallback(response) { 
	              	$scope.choiceRemove = "Could not delete choice, try again!"; 
	              });
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
