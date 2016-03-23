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
            'solicitud_vehiculo',
            'solicitud_giropaquete',
            // 'esperar_servicio'
        ]);
})();