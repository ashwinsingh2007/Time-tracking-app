(function() {
    var tasksFactory = function(appSettings, $http, $q) {
        var factory = [];

        factory.getTasks = function() {
            var deferred = $q.defer();
            var json = { id: 'sd', permission: 'user' };
            $http({
                method: "GET",
                url: "/api/tasks",
                params: json,
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(function mySuccess(response) {
                deferred.resolve(response.data);
                return response.data;
            }, function myError(response) {
                return response.statusText;
            });
            return deferred.promise;
        };
        factory.getTaskByUserId = function(id) {
            $http.get("url")
                .then(function(response) {
                    return [];
                    /*response.data;*/

                });
        };
        factory.addTaskByUserId = function(name, $scope) {
            var deferred = $q.defer();
            var json = { id: 'sd', task: name.Name };
            $http({
                method: "POST",
                url: "/api/tasks",
                data: JSON.stringify(json),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(function mySuccess(response) {
                deferred.resolve(response.data);
                return response.data;
            }, function myError(response) {
                return response.statusText;
            });
            return deferred.promise;
        }
        return factory;
    };

    tasksFactory.$inject = ['appSettings', '$http', '$q'];

    angular.module('appTimeTracker').factory('tasksFactory', tasksFactory);

}());