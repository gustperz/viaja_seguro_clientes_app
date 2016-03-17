(function() {
    'use strict';

    angular.module('mapa_ubicacion')
        .controller('direccionCtrl', controls_direccion);

    controls_direccion.$inject = ['$scope', 'posicionActual', 'geoLocationService'];

    function controls_direccion($scope, posicionActual, geoLocationService) {

        var vm = this;
        vm.location = posicionActual;
        vm.goCurentPos = goCurentPos;

        function goCurentPos(){
            geoLocationService.current().then(function(){
                $scope.$emit('center_map');
            },function(error) {});
        }
    }
})();
