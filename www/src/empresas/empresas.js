/**
 * Created by tav0 on 4/02/16.
 */

angular.module('empresas', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state('app.lista_empresas', {
                url: '/empresas',
                templateUrl: 'src/empresas/lista_empresas.html',
                controller: 'ListaEmpresasCtrl'
            })
            .state('app.empresa_detalles', {
                url: '/empresas/:empresa_id',
                templateUrl: 'src/empresas/info_empresa.html',
                controller: 'InfoEmpresaCtrl'
            })
            .state('app.servicios_empresa', {
                url: '/empresas/:empresa_id/servicios',
                templateUrl: 'src/empresas/servicios_empresa.html',
                controller: 'ServiciosCtrl'
            })
    });