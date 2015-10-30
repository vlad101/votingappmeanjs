'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    //var userId = $scope.getCurrentUser()._id;
    
    $http.get('/api/polls', {"userId": $scope.getCurrentUser()._id}).success(function(polls) {
      $scope.polls = JSON.stringify(polls);
    });
  });
