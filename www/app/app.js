(function() {
    "use strict";
    angular
        .module("app", [
            'ionic',
            'angular-jwt',
            '$selectBox',
            'uiGmapgoogle-maps',
            'ngCordova',

            'auth',
            'mapa_ubicacion',
            'empresas',
            'solicitudes',
            'espera_servicio'
        ]);
})();