(function () {
    'use strict';

    angular
        .module('empresas')
        .service('empresasService', empresasService);

    function empresasService($http, API_URL) {
        this.getAll = function (){
            return $http.get(API_URL+'/empresas');
        }

        this.get = function (id){
            return $http.get(API_URL+'/empresas/'+id);
        }

        this.getCentrales = function (id){
            return $http.get(API_URL+'/empresas/'+id+'/centrales');
        }
    }
})();