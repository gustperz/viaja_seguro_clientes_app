(function() {
    'use strict';

    angular.module('mapa_ubicacion')
        .factory('direcciones_favoritas', direcciones_favoritas);

    /* @ngInject */
    function direcciones_favoritas(posicionActual)
    {
        var direcciones = [];
        var service = {
            getLocal: getLocal,
            setLocal: setLocal
        };

        return service;

        function setLocal(direccion) {
            direcciones = JSON.parse(localStorage.getItem('direcciones')) || {};
            direcciones[posicionActual.ciudad] || (direcciones[posicionActual.ciudad] = []);
            direcciones[posicionActual.ciudad].push({nombre: direccion.nombre, posicion: posicionActual});
            localStorage.setItem('direcciones', JSON.stringify(direcciones));
            return direcciones;
        }

        function getLocal() {
            if(direcciones = JSON.parse(localStorage.getItem('direcciones'))){
                return direcciones[posicionActual.ciudad]
            }
            return [];
        }
    }
})();
