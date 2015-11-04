'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $location, Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.userId = $scope.getCurrentUser()._id;

    // Button ng-click to go to specific path
    $scope.go = function (path) {
      $location.path(path);
    };

    /*
    Default text Not yet implemented
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    */
  });
