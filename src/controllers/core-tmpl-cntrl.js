(function(){
    'use strict';

    angular
        .module('app')
        .controller('coreCtrl', coreCtrl);
    coreCtrl.$inject = ['$scope', 'cytoData'];
    function coreCtrl($scope, cytoData){
        $scope.layout = {name:'grid'};

        $scope.graph = {};
        cytoData.getGraph('core').then(function(graph){
            $scope.graph = graph;
        });

        $scope.panTo = function(){
            $scope.graph.pan({
                x: 100,
                y: 100
            })
        };
        $scope.center = function(){
            $scope.graph.center()
        };

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