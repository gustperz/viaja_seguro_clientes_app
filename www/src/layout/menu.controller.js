/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, $state) {
        $scope.menuList = [
            {nombre: 'Empresas',
                statego : 'app.empresas',
                icon: 'ion-ios-list'
            }
        ];

        $scope.logout = function (){
            sessionStorage.clear();
            $state.go('login');
        }
    }
})();