/*global angular*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('resourceCtrl', resourceCtrl);

    resourceCtrl.$inject = ['$scope', 'dataService'];

    function resourceCtrl($scope, dataSvc) {
        $scope.title = 'resourceCtrl';
        $scope.httpValues = [];
        $scope.requestValuesHttp = requestValuesHttp;

        $scope.resourceValues = [];
        $scope.requestValuesResource = requestValuesResource;

        $scope.restangularValues = [];
        $scope.requestValuesRestangular = requestValuesRestangular;

        $scope.requestValueByIdHttp = requestValueByIdHttp;
        $scope.singleValueHttp = undefined;

        $scope.requestValueByIdResource = requestValueByIdResource;
        $scope.singleValueResource = undefined;

        $scope.requestValueByIdRestangular = requestValueByIdRestangular;
        $scope.singleValueRestangular = undefined;
        activate();

        function activate() {
            $scope.idForHttp = 0;
            $scope.idForResource = 0;
            $scope.idForRestangular = 0;
        }

        function requestValuesHttp() {
            dataSvc.getValuesHttp()
                .then(function (results) {
                    $scope.httpValues = results;
                },
                    function (e) {
                        console.log(['Failure from controller', e]);
                    });
        }

        function requestValuesResource() {
            dataSvc.getValuesResource()
                .then(function (results) {
                    $scope.resourceValues = results;
                },
                    function (e) {
                        console.log(['Failure from controller', e]);
                    });
        }

        function requestValuesRestangular() {
            dataSvc.getValuesRestangular()
                .then(function (results) {
                    $scope.restangularValues = results;
                },
             function (e) {
                 console.log(['Failure from controller: ', e]);
             });
        }

        function requestValueByIdHttp() {

            dataSvc.getSingleValueHttp($scope.idForHttp)
                .then(function (result) {
                    $scope.singleValueHttp = result;
                },
                    function (e) {
                        console.log(['Failure from controller:', e]);
                    });
        }

        function requestValueByIdResource() {

            dataSvc.getValueByIdResource($scope.idForResource)
                .then(function (result) {
                    $scope.singleValueResource = result;
                },
                    function (e) {
                        console.log(['Failure from controller:', e]);
                    });
        }

        function requestValueByIdRestangular() {

            dataSvc.getValueByIdRestangular($scope.idForRestangular)
                .then(function (result) {
                    $scope.singleValueRestangular = result;
                },
                    function (e) {
                        console.log(['Failure from controller:', e]);
                    });
        }
    }
})();
