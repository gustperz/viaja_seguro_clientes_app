(function () {
    'use strict';

    angular
        .module('empresas')
        .service('empresasService', empresasService);

    /* @ngInject */
    function empresasService($http, API_URL) {
        this.getAll = function (rest){
            rest || (rest = false);
            if(rest){
                return $http.get(API_URL + '/empresas/en_ciudad/'+rest.ciudad);
            }else {
                return $http.get(API_URL + '/empresas?populate=centrales&fields=id,nombre_corto,nombre_largo,direccion,telefono,logo');
            }
        }

        this.get = function (id){
            return $http.get(API_URL+'/empresas/'+id);
        }

        this.getCentrales = function (id){
            return $http.get(API_URL+'/centrales?fields=ciudad,direccion,telefono&empresa='+id);
        }
    }
})();