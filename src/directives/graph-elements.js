(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphElements', graphElements);

    graphElements.$inject = ['cytoHelpers', 'cytoElementsHelpers'];
    function graphElements(cytoHelpers, cytoElementsHelpers){
        var directive = {
            restric: 'A',
            require: '^cytoscape',
            link:linkFn
        };
        return directive;

        function linkFn(scope,elements,attrs,controller){
            var _scope = controller._getCytoscapeScope();
            var isDefined = cytoHelpers.isDefined;
            var graph;
            controller._getCytoscapeGraph().then(function(cy){
                graph = cy;
            });
            scope.$watchCollection(function(){
                return _scope.graphElements;
            }, function(nv,ov){
                if(isDefined(nv) && nv !== ov){
                    cytoElementsHelpers.processChange(nv, ov, graph, _scope);
                }
            });

    scope.watchEles = [];
    scope.$watch(CollectionMap,function(nv,ov){
            console.log('wattch collectionmap')
    });
    scope.$watch(function(){
        return scope.watchEles;
    },function(nv,ov){
        if(nv !== ov)
            cytoElementsHelpers.processChange(_scope.graphElements,ov,graph,_scope);
            //cytoElementsHelpers.updateData(nv, ov, graph);
    },true);

    function CollectionMap(){
        return angular.extend(scope.watchEles, _scope.graphElements.map(function(data){
            return data.data
        }));

    }
/*            scope.$watch(function(){

            },function(nv,ov){
                if(isDefined(nv)){
                    cytoElementsHelpers.processChange(_scope.graphElements, ov, graph, _scope);
                    graph.resize();
                }
            });*/
        }
    }
})();