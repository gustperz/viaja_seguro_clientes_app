/**
 * Created by tav0 on 13/04/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes', ['solicitud_vehiculo'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.solicitud', {
                    url: '/empresas/:empresa_id/solicitar',
                    templateUrl: 'app/solicitudes/solicitud.html',
                    controller: 'SolicitudesCtrl as vm'
                })
        });

})();