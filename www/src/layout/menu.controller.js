/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, authService) {
        $scope.menuList = [
            {nombre: 'Empresas',
                statego : 'app.lista_empresas',
                icon: 'ion-ios-list'
            }
        ];

        $scope.logout = authService.logout;
    }
})();
