/**
 * Created by tav0 on 28/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes')
        .service('solicitudesService', solicitudesService);

    /* @ngInject */
    function solicitudesService($http, API_URL, authService, $sails, $q) {
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
          var deferred = $q.defer();
          var request = {
            method: 'post',
            url: API_URL+'/clientes/'+authService.currentUser().cliente_id+'/solicitud',
            data: solicitud,
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
          };

          $sails.request(request, function (resData, jwres) {
            if (jwres.error) {
              return deferred.reject();
            }
            return deferred.resolve(resData.data);
          });
          return deferred.promise;
        }

        this.getLast = function() {
          var deferred = $q.defer();
          var request = {
            method: 'get',
            url: API_URL+'/clientes/'+authService.currentUser().cliente_id+'/solicitud',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
          };

          $sails.request(request, function (resData, jwres) {
            if (jwres.error) {
              return deferred.reject();
            }
            console.log(jwres)
            return deferred.resolve(resData.data);
          });
          return deferred.promise;
        }

      this.cancel = function(solicitud) {
          console.log(solicitud)
        var deferred = $q.defer();
        var request = {
          method: 'post',
          url: API_URL+'/solicitudes/'+solicitud+'/cancel',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
          }
        };

        $sails.request(request, function (resData, jwres) {
          if (jwres.error) {
            console.log(jwres)

            return deferred.reject();
          }
          return deferred.resolve(resData.data);
        });
        return deferred.promise;
      }

    }
})();
