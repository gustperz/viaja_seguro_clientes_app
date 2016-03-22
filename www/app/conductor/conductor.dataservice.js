/**
 * Created by tav0 on 28/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .service('ConductorService', ConductorService);

    /* @ngInject */
    function ConductorService($http, API_URL) {
        this.get = function (conductor_id){
            return $http.get(API_URL+'/conductores/'+conductor_id);
        }
        this.getVehiculoConductor = function (conductor_id){
            return $http.get(API_URL+'/conductores/'+conductor_id+'/vehiculo');
        }
        this.getPosicion = function (conductor_id){
            return $http.get(API_URL+'/conductores/'+conductor_id+'/ubicacion');
        }
    }
})();
