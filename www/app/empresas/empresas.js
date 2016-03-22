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
                    controller: 'ListaEmpresasCtrl'
                })
                .state('app.empresa_detalles', {
                    url: '/empresas/:empresa_id',
                    templateUrl: 'app/empresas/info_empresa.html',
                    controller: 'InfoEmpresaCtrl'
                })
                .state('app.servicios_empresa', {
                    url: '/empresas/:empresa_id/servicios',
                    templateUrl: 'app/empresas/servicios_empresa.html',
                    controller: 'ServiciosCtrl as vm'
                })
        });

})();
