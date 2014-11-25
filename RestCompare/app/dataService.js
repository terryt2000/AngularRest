/*global angular*/
(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$resource', 'Restangular'];

    function dataService($http, $resource, Restangular) {
        var values = [];
        var value = '';

        var service = {
            value: value,
            values: values,
            getValuesHttp: getValuesHttp,
            getSingleValueHttp: getSingleValueHttp,
            getValuesResource: getValuesResource,
            getValueByIdResource: getSingleValueResource,
            getValuesRestangular: getValuesRestangular,
            getValueByIdRestangular: getSingleValueRestangular
        };

        return service;

        function getValuesHttp() {
            return $http.get('/api/values')
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Http: Got values', result]);
                return result.data;
            }

        }
        function getValuesResource() {
            var api = $resource('/api/values');
            return api.query().$promise
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Resource: Got values', result]);
                return result;
            }
        }

        function getValuesRestangular() {
            var baseValuesApi = Restangular.all('api/values');
            return baseValuesApi.getList()
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Restangular: Got values', result]);
                return result;
            }
        }

        function getSingleValueHttp(valueId) {
            var config = {
                params: {
                    id: valueId
                },
                responseType: 'json'
            };
            return $http.get('/api/values', config)
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Http: Got Single Value', result]);
                return result.data;
            }
        }

        function getSingleValueResource(valueId) {
            var api = $resource('/api/values/:id');
            return api.get({ id: valueId }).$promise
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Resource: Got values', result]);
                return result;
            }
        }
        function getSingleValueRestangular(valueId) {
            var baseValuesApi = Restangular.one('api/values', valueId);
            return baseValuesApi.get()
                .then(success)
                .catch(fail);

            function success(result) {
                console.log(['Restangular: Got single value', result]);
                return result;
            }
        }

        function fail(e) {
            console.log(['Request Failed', e]);
        }
    }
})();