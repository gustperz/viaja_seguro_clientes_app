/**
 * Created by tav0 on 28/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes')
        .service('solicitudesService', solicitudesService);

    /* @ngInject */
    function solicitudesService($http, API_URL, authService) {
        this.getCentral = function (empresa_id, ciudad){
            return $http.get(API_URL+'/centrales?fields=pos_lng,pos_lat&ciudad_place_id='+ciudad+'&empresa='+empresa_id);
        }
        this.getRutasCentral = function (central_id){
            return $http.get(API_URL+'/rutas?central='+central_id+'');
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
        this.put = function(solicitud) {
            return $http.put(
                API_URL+'/clientes/'+authService.currentUser().cliente_id+
                '/solicitudes/'+solicitud.id, solicitud
            );
        }
        this.cancel = function(solicitud) {
            return $http.post(
                API_URL+'/solicitudes/'+solicitud.id+'/cancel'
            );
        }
        this.getLast = function() {
            return $http.get(API_URL+'/clientes/'+authService.currentUser().cliente_id+'/solicitudes');
        }
    }
})();
