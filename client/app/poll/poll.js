'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls/:userId/all', {
        templateUrl: 'app/poll/polllist.html',
        controller: 'PollCtrl'
      })
      .when('/polls/all', {
        templateUrl: 'app/poll/polllist.html',
        controller: 'PollCtrl'
      })
      .when('/polls/add', {
        templateUrl: 'app/poll/polllist.html',
        controller: 'PollCtrl'
      })
      .when('/polls/:pollId', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      })
      .when('/polls/:pollId/edit', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      })
  });
