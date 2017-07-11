(function() {

    var app = angular.module('appTimeTracker', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'RecordsController',
                templateUrl: 'app/views/records.html'
            })
            .when('/tasks', {
                controller: 'TasksController',
                templateUrl: 'app/views/task.html'
            })
            .when('/projects/:projectId', {
                controller: 'CourseViewController',
                templateUrl: 'app/views/projectItem.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);
}());