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
                    templateUrl: 'src/solicitud_vehiculo/solicitar_vehiculo.html',
                    controller: 'SolicitarVehiculoCtrl as vm',
                    resolve:{
                        '':function($ionicLoading){
                            $ionicLoading.show();
                        }
                    }
                })
                .state('app.solicitud_vehiculo_midireccion', {
                    url: '/midireccion',
                    templateUrl: 'src/solicitud_vehiculo/mapa.html',
                    controller: 'MapaMiDireccionCtrl as vm'
                })
        });
})();
