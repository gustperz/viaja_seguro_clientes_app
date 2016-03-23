/**
 * Created by tav0 on 1/03/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('mostrarAlert', function($ionicPopup){
            return function (titulo, contenido, callable){
                var alertPopup = $ionicPopup.alert({
                    title: titulo,
                    template: contenido
                });
                alertPopup.then(function (res) {
                    callable ? callable() : null;
                });
            }
        });

})();
