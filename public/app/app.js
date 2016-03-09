angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'MainCtrl'
        });
});

angular.module('app').controller('MainCtrl', function ($scope) {
    $scope.myVar = 'hello world';
})