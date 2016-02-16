(function(){
    'use strict';

    angular
        .module('app')
        .controller('layoutsCtrl', layoutsCtrl);
    layoutsCtrl.$inject = ['$scope','cytoData'];
    function layoutsCtrl($scope,cytoData){
        $scope.layout = {name:'grid'};
        $scope.elements = {
            n1:{data:{}},
            n2:{data:{}},
            n3:{data:{}},
            n4:{data:{}},
            n5:{data:{}},
            e1:{
                data:{
                    source: 'n1',
                    target: 'n3'
                }
            },
            e2:{
                data:{
                    source: 'n2',
                    target: 'n4'
                }
            },
            e3:{
                data:{
                    source: 'n4',
                    target: 'n5'
                }
            },
            e4:{
                data:{
                    source: 'n4',
                    target: 'n3'
                }
            },
        }
    }
})();