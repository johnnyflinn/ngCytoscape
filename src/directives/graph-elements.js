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
                    processChange(nv, ov);
                }
            });
            function processChange(newElements, oldElements) {
                if (newElements.length === 0) {
                    graph.nodes().forEach(function (ele) {
                        graph.remove(ele);
                    });
                }
                if (graph.elements().length === 0) {
                    _addElements(newElements);

                } else {
                    var graphIndex = {};
                    var newElementIndex = {};
                    graph.elements().each(function (i, ele) {
                        graphIndex[ele.id()] = 1;
                    });
                    //To Add
                    var toAdd = [];
                    cytoHelpers.asyncEach(newElements, function (ele, index) {

                        newElementIndex[ele.data.id] = ele.data.id;
                        if (ele.data && ele.data.id) {
                            if (graphIndex[ele.data.id]) {
                                //Check if cytoscape element data matches newElement data
                                var cytoElem = graph.nodes('#' + ele.data.id);
                                if (cytoElem.data() !== ele.data) {
                                    cytoElem.data(ele.data);
                                }
                            } else {
                                //It's new
                                toAdd.push(_addElement(ele, graph, scope));
                            }
                            //No ID.  Add It
                        } else {
                            toAdd.push(_addElement(ele, graph, scope));
                        }
                    }).then(function () {
                        if (toAdd.length === 0) {
                            //Must be removing something
                            graph.elements().each(function (i, ele) {
                                if (!newElementIndex[ele.id()]) {
                                    var removeEleEdges = ele.neighborhood('edge').jsons();
                                    var removeEdgeIndex = {};
                                    angular.forEach(removeEleEdges, function (edge, i) {
                                        removeEdgeIndex[edge.data.id] = edge.data.id;
                                    });
                                    for (var ind = newElements.length; ind--;) {
                                        if (removeEdgeIndex[newElements[ind].data.id]) {
                                            newElements.splice(ind, 1);
                                        }
                                    }
                                    graph.remove('#' + ele.id());
                                }
                            });
                        } else {
                            graph.add(toAdd);
                        }

                        graph.style().update();
                        graph.elements(':visible').layout(_scope.graphLayout || {name: 'grid'});
                        graph.resize();
                    });
                }
            }
            function _addElements(elements){
                if(areValidElements(elements)){
                    cytoHelpers.asyncEach(elements, function(ele){
                        if(ele.group === 'nodes'){
                            _addElement(ele);
                        }else if(ele.group === 'edges'){
                            _addElement(ele);
                        }
                    }).then(function() {

                        graph.add(elements);
                        graph.elements(':visible').layout(_scope.graphLayout || {name: 'grid'});
                    });
                }
            }

            function _addElement(element){
              /* scope.$watchCollection(function(){
                    return element.data
                },function(nv,ov){
                   console.log('fired')
                    if(nv !== ov) {
                        var id = graph.getElementById(nv.id);
                        id.data(nv);
                    }
                });*/
                return element;
            }
            function areValidElements(nv){
                var nodeIndex = {};
                var cleanElements = [];
                var errors = 0;
                angular.forEach(nv,function(ele,i){
                    if(!ele.hasOwnProperty('data')){
                        errors ++;
                        $log.error('Elements require a data property');
                    }else if(!ele.data.hasOwnProperty('id')){
                        errors ++;
                        $log.error('Elements require an id property');
                    }else{
                        cleanElements.push(ele);
                        if(ele.group === 'nodes'){
                            nodeIndex[ele.data.id] = ele.data.id;
                        }
                    }
                });
                angular.forEach(cleanElements, function(ele){
                    if(ele.group !== 'nodes'){
                        if(!ele.data.hasOwnProperty('target')){
                            errors ++;
                            $log.error('Edges require a target');
                        }
                        if(!ele.data.hasOwnProperty('target')){
                            errors ++;
                            $log.error('Edges require a target');
                        }
                        if(!nodeIndex[ele.data.target]){
                            errors ++;
                            $log.error('Edges require a target node.');
                        }
                        if(!nodeIndex[ele.data.source]){
                            errors ++;
                            $log.error('Edges require a source node.');
                        }
                    }
                });
                if(errors > 0){
                    return false;
                }else{
                    return true;
                }

            }


        }
    }
})();