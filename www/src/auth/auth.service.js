(function () {
    'use strict';

    angular
        .module('auth')
        .service('authService', authService);

    function authService($http, API_URL, jwtHelper, $state) {
        this.login = function (usuario){
            return $http.post(API_URL+'/login', usuario);
        };

        this.register = function (usuario){
            return $http.post(API_URL+'/usuarios/clientes', usuario);
        };

        this.updatePassword = function (usuario, contrasenas){
            return $http.post(API_URL+'/usuarios/'+usuario.id+'/change_pass',
                contrasenas,
                {headers:  {'Authorization': 'Bearer '+sessionStorage.getItem('jwt')}}
            );
        };

        this.storeUser = function (jwt) {
            sessionStorage.setItem('jwt', jwt);
            var usuario = jwtHelper.decodeToken(jwt).usuario;
            sessionStorage.setItem('usuario',JSON.stringify(usuario));
            return usuario;
        }

        this.currentUser = function(){
            return JSON.parse(sessionStorage.getItem('usuario'));
        }

    }
})();