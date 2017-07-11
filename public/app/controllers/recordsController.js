(function() {

    var RecordsController = function($scope, recordsFactory, tasksFactory) {
        $scope.loaded = false;
        $scope.tasks = null;
        $scope.records = null;

        function init() {
            $scope.tasks = tasksFactory.getTasks();
            $scope.records = recordsFactory.getRecords();

            /*$scope.records.$loaded().then(function(x) {
                $scope.loaded = x === $scope.records;
            })*/
            $scope.loaded = true;
        }

        $scope.getTaskName = function(log) {
            /*for (var x = 0, lenx = $scope.projects.length; x < lenx; x++) {
                if ($scope.projects[x].$id == log.projectId) {
                    return $scope.projects[x].name;
                }
            }*/
            return null;
        };
        $scope.getRecords = function() {

        }

        $scope.getDateStart = function(log) {
            return moment(log.dateStart, "x").format("HH:mm:ss, DD-MM-YYYY");
        };

        $scope.getTime = function(log) {
            return moment().startOf('day').seconds(log.seconds).format('HH:mm:ss');
        };

        init();
    };

    RecordsController.$inject = ['$scope', 'recordsFactory', 'tasksFactory'];

    angular.module('appTimeTracker').controller('RecordsController', RecordsController);

}());