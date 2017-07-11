(function() {

    var TasksController = function($scope, tasksFactory, recordsFactory) {
        $scope.loaded = false;
        $scope.tasks = null;
        $scope.records = null;

        function init() {
            tasksFactory.getTasks().then(function(data) {
                $scope.tasks = data;
                console.log($scope.tasks);
            });
            /*recordsFactory.getRecords().then(function(data) {
                $scope.records = data;
            });*/
            console.log('hi');
            console.log($scope.tasks);

            /*$scope.tasks.$loaded().then(function(x) {
                $scope.loaded = x === $scope.records;
            });*/
            $scope.loaded = true;
        }

        $scope.getTimeSpent = function(project) {
            var seconds = 0;
            return null;
        };

        $scope.addTask = function(name) {
            console.log($scope.tasks);
            tasksFactory.addTaskByUserId(name, $scope).then(function(data) {
                $scope.tasks = data;
                console.log($scope.tasks);
            });
            $scope.newProjectName = null;
        };

        $scope.deleteTask = function(project) {
            var _id = project.$id;
            if ($scope.logs.length > 0) {
                for (var i = 0, len = $scope.logs.length; i < len; i++) {
                    if ($scope.logs[i].projectId == _id) {
                        $scope.logs.$remove($scope.logs[i]);
                    }
                }
            }
            $scope.projects.$remove(project);
        };

        init();
    };

    TasksController.$inject = ['$scope', 'tasksFactory', 'recordsFactory'];

    angular.module('appTimeTracker').controller('TasksController', TasksController);

}());