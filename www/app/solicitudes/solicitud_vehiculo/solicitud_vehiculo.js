/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular.module('solicitud_vehiculo', ['conductor'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.solicitud.vehiculo', {
                    url: '/vehiculo',
                    views: {
                        'tipoSolicitud' :{
                            templateUrl: 'app/solicitudes/solicitud_vehiculo/solicitar_vehiculo.html',
                            controller: 'SolicitarVehiculoCtrl as vm'
                        }
                    }
                })
        });
})();
