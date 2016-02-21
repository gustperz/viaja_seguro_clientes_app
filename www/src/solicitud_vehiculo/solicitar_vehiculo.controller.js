/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('SolicitarVehiculoCtrl', SolicitarVehiculoCtrl);

    function SolicitarVehiculoCtrl($scope) {
        var vm = this;
        $scope.$on('$ionicView.loaded',function(){
            vm.empresas = [];
        });


    }
})();