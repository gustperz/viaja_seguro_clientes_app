/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('ListaEmpresasCtrl', ListaEmpresasCtrl);

    function ListaEmpresasCtrl($scope, $state) {
        $scope.empresas = [
            {nombre: 'Empresa 1',
                direccion: 'calle 25',
                telefono: '9348756',
                id: '1'
            },
            {nombre: 'Empresa 3',
                direccion: 'calle 98',
                telefono: '657483',
                id: 2
            }
        ]

        $scope.showServiciosEmpresa = showServiciosEmpresa;

        function showServiciosEmpresa(empresa){
            $state.go('app.servicios_empresa', {'empresa_id' : 1});
        }
    }
})();