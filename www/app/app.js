(function() {
    "use strict";
    angular
        .module("app", [
            'ionic',
            'angular-jwt',
            '$selectBox',
            'uiGmapgoogle-maps',
            'ngCordova',
            'ngSails',

            'auth',
            'mapa_ubicacion',
            'empresas',
            'solicitudes',
            'espera_servicio',
            'conductor'
        ]);
})();
