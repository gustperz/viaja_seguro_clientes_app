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
                return $http.get(API_URL + '/empresas?include=centrales&ciudad='+rest.ciudad);
            }else {
                return $http.get(API_URL + '/empresas?include=centrales');
            }
        }

        this.get = function (id){
            return $http.get(API_URL+'/empresas/'+id);
        }

        this.getCentrales = function (id){
            return $http.get(API_URL+'/empresas/'+id+'/centrales');
        }
    }
})();