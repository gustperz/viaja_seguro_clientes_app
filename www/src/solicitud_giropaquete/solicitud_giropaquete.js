/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular.module('solicitud_giropaquete', ['conductor'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.solicitud_paquete', {
                    url: '/empresas/:empresa_id/solicitar_paquete',
                    templateUrl: 'src/solicitud_giropaquete/solicitud.html',
                    controller: 'SolicitarPaqueteCtrl as vm'
                })
                .state('app.solicitud_giro', {
                    url: '/empresas/:empresa_id/solicitar_giro',
                    templateUrl: 'src/solicitud_giropaquete/solicitud.html',
                    controller: 'SolicitarGiroCtrl as vm'
                })
        });
})();
