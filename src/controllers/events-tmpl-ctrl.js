(function(){
    'use strict';

    angular
        .module('app')
        .controller('eventsCtrl', eventsCtrl);
    eventsCtrl.$inject = ['$scope'];
    function eventsCtrl($scope){
        $scope.event = {
            name: ''
        };
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
            n1:{
                data:{
                    weight: 30
                },
                position:{
                    x:50,
                    y:50
                }
            }
        };
        $scope.$on('cy:node:mouseover', function(ng,cy){
            $scope.event.name = 'cy:node:mouseover';
            $scope.$apply();
        });
        $scope.$on('cy:node:mouseout', function(ng,cy){
            $scope.event.name = 'cy:node:mouseout';
            $scope.$apply();
        });
        $scope.$on('cy:node:mousedown', function(ng,cy){
            $scope.event.name = 'cy:node:mousedown';
            $scope.$apply();
        });
        $scope.$on('cy:node:mouseup', function(ng,cy){
            $scope.event.name = 'cy:node:mouseup';
            $scope.$apply();
        });
        $scope.$on('cy:node:drag', function(ng,cy){
            $scope.event.name = 'cy:node:drag';
            $scope.$apply();
        })
    }
})();