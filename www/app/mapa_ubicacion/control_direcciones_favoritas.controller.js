(function() {
    'use strict';

    angular.module('mapa_ubicacion')
        .controller('direccionesFavoritasCtrl', direccionesFavoritasCtrl);

    /* @ngInject */
    function direccionesFavoritasCtrl($scope, $ionicPopup, direcciones_favoritas, posicionActual, geoLocationService) {

        var vm = this;

        vm.showfavoritas = showfavoritas;
        vm.addTOFavorite = addTOFavorite;

        function showfavoritas(){
            $scope.direcciones = direcciones_favoritas.getLocal();
            $scope.selectedDireccion = '';
            $scope.selectDireccion = function(direcion){
                $scope.selectedDireccion = direcion;
            };
            var popup = {
                template:
                '<ion-radio ng-repeat="direccion in direcciones" ' +
                '           ng-model="selectedDireccion"' +
                '           ng-click="selectDireccion(direccion)">' +
                '    {{direccion.nombre}} <span style="color: #999999; font-size: 12px">({{direccion.posicion.direccion}})</span>' +
                '</ion-radio>',
                title: 'Direcciones Favoritas',
                scope: $scope,
                buttons: [
                    { type: 'button-icon ion-reply button-positive button-clear' },
                    { type: 'button-icon ion-checkmark button-positive button-clear',
                        onTap: function(e) {
                            if (!$scope.selectedDireccion) {
                                e.preventDefault();
                            } else {
                                return $scope.selectedDireccion;
                            }
                        }
                    },
                    { type: 'button-icon ion-plus button-positive button-clear',
                        onTap: function(e) {
                            return 'add';
                        }
                    }
                ]
            };
            var myPopup = $ionicPopup.show(popup);
            myPopup.then(function(res){
                if(res){
                    if(res == 'add'){
                        showaddTOFavorite();
                    }else{
                        geoLocationService.setPosicionActual(res.posicion);
                        $scope.$emit('center_map');
                    }
                }
            });
        }

        function showaddTOFavorite(){
            $scope.direccion = {direccion: posicionActual.direccion};
            var popup = {
                template:
                '<label class="item item-input">' +
                '   <input type="text" placeholder="Nombre ubicacion" ng-model="direccion.nombre" required>' +
                '</label>' +
                '<label class="item item-input input-readonly-white">' +
                '   <input type="text" ng-model="direccion.direccion" readonly>' +
                '</label>',
                title: 'Agregar Actual a Favoritas',
                scope: $scope,
                buttons: [
                    { type: 'button-icon ion-reply button-positive button-clear',
                        onTap: function() {
                            return 'back';
                        }
                    },
                    { type: 'button-icon ion-checkmark button-positive button-clear',
                        onTap: function(e) {
                            if (!$scope.direccion.nombre) {
                                e.preventDefault();
                            } else {
                                return $scope.direccion;
                            }
                        }
                    }
                ]
            };
            var myPopup = $ionicPopup.show(popup);
            myPopup.then(function(res){
                if(res == 'back'){
                    showfavoritas();
                }else{
                    addTOFavorite(res);
                }
            });
        }

        function addTOFavorite(direccion){
            direcciones_favoritas.setLocal(direccion);
        }
    }
})();
