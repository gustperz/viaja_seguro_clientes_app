/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('MenuCtrl', MenuCtrl);

    /* @ngInject */
    function MenuCtrl(authService) {
        var vm = this;
        vm.nombreUsuario = authService.currentUser().nombre;
        vm.menuList = [
            {nombre: 'Empresas',
                statego : 'app.lista_empresas',
                icon: 'ion-ios-list'
            },
            {nombre: 'Mi ubicacion',
                statego : 'app.mapa_midireccion',
                icon: 'ion-ios-location'
            }
        ];

        vm.logout  = function () {
            authService.logout();
        }
    }
})();
