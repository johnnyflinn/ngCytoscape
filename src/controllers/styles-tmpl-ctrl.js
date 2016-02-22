(function(){
    'use strict';

    angular
        .module('app')
        .controller('stylesCtrl', stylesCtrl);
    stylesCtrl.$inject = ['$scope'];
    function stylesCtrl($scope){

        $scope.layout = {name:'grid'};
        $scope.styles = [
            {
                selector: 'node',
                style:{
                   height: 'data(weight)',
                   width: 'data(weight)',
                   'background-color': 'mapData(weight, 0, 100, blue, red)'
                }
            }
        ];
        $scope.elements = {
            n1:{data:{
                weight: 30
            }}
         }
    }
})();