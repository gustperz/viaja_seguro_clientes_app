/**
 * Created by tav0 on 28/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .service('solicitudVehiculoService', solicitussVehiculoService);

    function solicitussVehiculoService($http, API_URL) {
        this.getCentral = function (empresa_id, ciudad){
            return $http.get(API_URL+'/empresas/'+empresa_id+'/centrales?ciudad='+ciudad);
        }
        this.getRutasCentral = function (central_id){
            return $http.get(API_URL+'/centrales/'+central_id+'/rutas');
        }
        this.getCupos = function (conductor_id){
            return $http.get(API_URL+'/conductores/'+conductor_id+'/cupos');
        }
    }
})();
