/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';
    angular.module('empresas', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.lista_empresas', {
                    url: '/empresas',
                    templateUrl: 'app/empresas/lista_empresas.html',
                    controller: 'ListaEmpresasCtrl as vm'
                })
                .state('app.empresa_detalles', {
                    url: '/empresas/:empresa_id',
                    templateUrl: 'app/empresas/info_empresa.html',
                    controller: 'InfoEmpresaCtrl as vm'
                })
                .state('app.empresa_centrales', {
                    url: '/empresas/:empresa_id/centrales',
                    templateUrl: 'app/empresas/centrales_empresa.html',
                    controller: 'CentralesEmpresaCtrl'
                })
                .state('app.servicios_empresa', {
                    url: '/empresas/:empresa_id/servicios',
                    templateUrl: 'app/empresas/servicios_empresa.html',
                    controller: 'ServiciosCtrl as vm'
                })
        });

})();
