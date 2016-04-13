/**
 * Created by tav0 on 13/04/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.solicitud', {
                    url: '/empresas/:empresa_id/solicitar',
                    templateUrl: 'app/solicitudes/solicitud.html',
                    controller: 'SolicitudesCtrl as vm'
                })
                .state('app.solicitud.vehiculo', {
                    url: '/vehiculo',
                    views: {
                        'tipoSolicitud' :{
                            templateUrl: 'app/solicitudes/solicitud_vehiculo/solicitar_vehiculo.html',
                            controller: 'SolicitarVehiculoCtrl as vm'
                        }
                    }
                })
                .state('app.solicitud.paquete', {
                    url: '/paquete',
                    views: {
                        'tipoSolicitud' :{
                            templateUrl: 'app/solicitudes/solicitud_giropaquete/solicitud.html',
                            controller: 'SolicitarPaqueteCtrl as vm'
                        }
                    }
                })
                .state('app.solicitud.giro', {
                    url: '/giro',
                    views: {
                        'tipoSolicitud' :{
                            templateUrl: 'app/solicitudes/solicitud_giropaquete/solicitud.html',
                            controller: 'SolicitarGiroCtrl as vm'
                        }
                    }
                })
        });

})();