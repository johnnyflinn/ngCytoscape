(function(){
   'use strict';
    angular
        .module('app')
        .controller('testCntrl', testCntrl);
    testCntrl.$inject = ['$scope', 'cytoData'];
    function testCntrl($scope, cytoData){
        $scope.elements = {};
        $scope.selected = {};
        $scope.count = 500;
        cytoData.getGraph('testgraph').then(function(graph){
            $scope.graph = graph;
            $scope.graph.on('layoutstart', function(evt){
                console.log('from graph', evt)
            });
        });
        $scope.removeControl = function(){
            delete $scope.elements['ngCyto'];
        }
        $scope.removeSelected = function(){
            delete $scope.elements[$scope.selected.id]
        }
        $scope.addControlElements = function(){
            angular.extend($scope.elements, {
                ngCyto:{
                    data:{weight:50}
                },
                cyto:{
                    data:{weight:20}
                },
                ng:{
                    data:{weight:100}
                },
                ngToNgCyto:{
                    data:{
                        source: 'ngCyto',
                        target: 'ng'
                    }
                }
            })
        };
        $scope.$on('cy:node:click', function(e,evt){
           $scope.selected = evt.cyTarget.data();
            $scope.$apply();
            //console.log($scope.selected)
        })
        $scope.style = [{
            selector: 'node',
            style:{
                height: 'data(weight)',
                width: 'data(weight)'
            }
        }]
        $scope.clearElements = function(){
            $scope.elements = {};
        }
        $scope.addElements = function(){
            var elements = {};

            for(var i = 0; i< $scope.count; i++){
                elements[i] = {data:{weight:i + 10}}
            }
            for(var e = 0; e < $scope.count; e++){
                elements['e'+e] = {
                    data:{
                        source: genRandomEdge(),
                        target: genRandomEdge()
                    }
                }
            }
            angular.extend($scope.elements,elements);
        }

        $scope.$on('cy:core:layoutstop', function(e,evt){
            console.log(evt)
        });
        $scope.runLayout = function(){
            $scope.graph.layout({name:'grid'})
        }
        function genRandomEdge(){
            var edge = Math.floor((Math.random() * $scope.count) + 1);
            if(edge === $scope.count){
                edge = $scope.count - 1
            }
            return edge

        }
    }
})();