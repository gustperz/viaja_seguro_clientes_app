/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope) {
        $scope.menuList = [
            {nombre: 'Home',
                statego : 'app',
                icon: 'ion-ios-undo'
            },
            {nombre: 'Asd',
                statego : 'app',
                icon: 'ion-ios-undo'
            },
            {nombre: 'Asd',
                statego : 'app',
                icon: 'ion-ios-undo'
            }
        ]
    }
})();