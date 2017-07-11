(function() {
    var recordsFactory = function(appSettings, $http) {
        var factory = [];
        factory.getRecords = function() {
            $http({
                method: "GET",
                url: ""
            }).then(function mySuccess(response) {
                return []; //response.data;;
            }, function myError(response) {
                return []; //response.statusText;
            });
            return [];
        };
        factory.addRecord = function(projectId, dateStart, seconds, notes) {
            $http({
                method: "POST",
                url: ""
            }).then(function mySuccess(response) {
                return response.data;
            }, function myError(response) {
                return response.statusText;
            });
        };
        return factory;
    };
    recordsFactory.$inject = ['appSettings', '$http'];
    angular.module('appTimeTracker').factory('recordsFactory', recordsFactory);
}());