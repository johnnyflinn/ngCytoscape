(function(){
    'use strict';

    angular
        .module('app')
        .controller('elementsCtrl', elementsCtrl);
    elementsCtrl.$inject = ['$scope'];
    function elementsCtrl($scope){
        $scope.layout = {name:'grid'};
        $scope.addElement = function(){
            angular.extend($scope.elements,{
                n1:{
                    data:{},
                    position:{
                        x: 50,
                        y: 50
                    }
                }
            })
        };
        $scope.removeElement = function(){
            $scope.elements = {};
        };
        $scope.elements = {};
    }
})();