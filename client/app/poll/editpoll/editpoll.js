'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editpoll/:pollId', {
        templateUrl: 'app/poll/editpoll/editpoll.html',
        controller: 'EditpollCtrl'
      });
  });
