/**
 * Created by tav0 on 25/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .service('GeographicService', GeographicService);

    function GeographicService($http, API_URL) {

        this.ciudades = function (departamento_id) {
            return $http.get(API_URL + '/departamentos/' + departamento_id + '/municipios');
        };

        this.departamentos = function () {
            return $http.get(API_URL + '/departamentos');
        };

    }
})();