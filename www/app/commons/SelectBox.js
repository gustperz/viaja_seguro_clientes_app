(function(){

    angular.module('$selectBox', []).directive('selectBox', function () {

        return {
            restrict: 'E',
            require: ['ngModel' ],
            scope: {
                ngSelectedValue: "=",
                ngTitle: "@",
                ngItemName: "@",
                ngItemId: "@",
                ngData: "@",
                ngPlaceholder: "@",
                ngHeaderClass: "@",
                ngSelectChanged: "&"
            },
            template:
                '<input  id="showed" type="text" ng-click="showSelectModal()" ' +
                        'style="cursor:inherit;" readonly  ng-model="label"/><i class="icon ion-arrow-down-b"></i>',
            controller: ['$scope', '$element', '$ionicModal', '$parse', function ($scope, $element, $ionicModal, $parse) {

                $scope.ngPlaceholder = ($scope.ngPlaceholder) ? $scope.ngPlaceholder : '';
                $scope.label = $scope.ngPlaceholder;

                $scope.showSelectModal = function () {
                    var val = $parse($scope.ngData);
                    $scope.ngDataObjects = val($scope.$parent);
                    $scope.ngHeaderClass = ($scope.ngHeaderClass) ? $scope.ngHeaderClass : "";
                    $scope.renderModal();
                    $scope.modal.show();
                };

                $scope.closeSelectModal = function () {
                    if($scope.modal)
                        $scope.modal.hide();
                };

                $scope.$on('$destroy', function (id) {
                    if($scope.modal)
                        $scope.modal.remove();
                });

                //$scope.$watch('ngPlaceholder', function (newValue, oldValue) {
                //    angular.element($element.children()[0]).children()[0].innerText = newValue;
                //});

                $scope.$watch('ngSelectedValue', function (newValue, oldValue) {
                    //console.log('selected value changed from ', oldValue, ' to ', newValue);
                    if(!newValue)
                        $scope.setPlaceholderLabel($scope.ngPlaceholder);
                });

                $scope.renderModal = function () {
                    $scope.modal = $ionicModal.fromTemplate(
                        '<ion-modal-view id="select">'+
                            '<ion-header-bar class="' + $scope.ngHeaderClass + ' item-input-inset">'+
                                '<label class="item-input-wrapper">'+
                                    '<i class="icon ion-search placeholder-icon"></i>'+
                                    '<input type="search" placeholder="Search" ng-model="search">'+
                                '</label>' +
                                '<a ng-click="closeSelectModal()" class="button button-icon">' +
                                    '<i class="icon ion-close"></i>'+
                                '</a>'+
                            '</ion-header-bar>'+
                            '<ion-content>'+
                                '<ion-list>'+
                                    '<ion-item ng-click="clickItem(item);"' +
                                              'ng-repeat="item in ngDataObjects | filter: search" ' +
                                              'ng-bind-html="item[\'' + $scope.ngItemName + '\']">' +
                                    '</ion-item>'+
                                '</ion-list>'+
                            '</ion-content>'+
                        '</ion-modal-view>', {
                        scope: $scope,
                        animation: 'slide-in-right',
                        backdropClickToClose : false
                    });
                };

                $scope.clickItem = function (item) {
                    $scope.ngSelectedValue = item[$scope.ngItemId];
                    $scope.label = item[$scope.ngItemName];
                    $scope.closeSelectModal();
                    $scope.ngSelectChanged({selectedValue: $scope.ngSelectedValue});
                };

                $scope.setPlaceholderLabel = function(label) {
                    $scope.label =  label;
                };

                $scope.$on('reset', function(){
                    $scope.setPlaceholderLabel($scope.ngPlaceholder);
                    $scope.ngSelectedValue = null;
                });
            }],
            compile: function ($element, $scope) {
                var input = $element.find('input.selected');
                angular.forEach({
                    'name': $scope.name,
                    'ng-model': $scope.ngSelectedValue
                }, function (value, name) {
                    if (angular.isDefined(value)) {
                        input.attr(name, value);
                    }
                });
            }
        };
    });
//# sourceMappingURL=selectBox.js.map
})();
