/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular.module('solicitud_vehiculo', ['conductor'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.solicitud_vehiculo', {
                    url: '/empresas/:empresa_id/solicitar_vehiculo',
                    templateUrl: 'app/solicitud_vehiculo/solicitar_vehiculo.html',
                    controller: 'SolicitarVehiculoCtrl as vm'
                })
                .state('app.solicitud_vehiculo_midireccion', {
                    url: '/midireccion',
                    templateUrl: 'app/mapa_ubicacion/mapa.html',
                    controller: 'MapaMiDireccionCtrl as vm'
                })
        });
})();
