'use strict';

describe('Controller: EditpollCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var EditpollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditpollCtrl = $controller('EditpollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
