/**
 * Created by tav0 on 28/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .service('solicitudVehiculoService', solicitussVehiculoService);

    function solicitussVehiculoService($http, API_URL, authService) {
        this.getCentral = function (empresa_id, ciudad){
            return $http.get(API_URL+'/empresas/'+empresa_id+'/centrales?ciudad='+ciudad);
        }
        this.getRutasCentral = function (central_id){
            return $http.get(API_URL+'/centrales/'+central_id+'/rutas');
        }
        this.getTurnos = function (ruta_id){
            return $http.get(API_URL+'/rutas/'+ruta_id+'/turnos');
        }
        this.getCupos = function (conductor_id){
            return $http.get(API_URL+'/conductores/'+conductor_id+'/cupos');
        }
        this.post = function(solicitud) {
            return $http.post(API_URL+'/clientes/'+authService.currentUser().cliente_id+'/solicitudes', solicitud);
        }
    }
})();
