
(function() {
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoElementsHelpers', cytoElementsHelpers);
    cytoElementsHelpers.$inject = ['cytoHelpers', '$log'];
    function cytoElementsHelpers(cytoHelpers, $log) {
        var service = {
            initElements: _initElements,
            addElements: _addElements,
            processChange: _processChange,
            updateData: _updateData
        };
        return service;
        function _initElements(elements, graph, scope) {
            //Add Elements To Graph
            for (var i in elements) {
                var element = elements[i];
                if (element.group === 'nodes' || element.group === 'edges') {
                    _addElement(element, graph, scope);
                }
            }
        }

        function _updateData(newVals, oldVals, graph) {
           /* for(i=0; i < oldVals.length; i++){
                if(graph.elements('#'+ oldVals[i].id).data() !== oldVals[i].data){
                    graph.elements('#' + oldVals[i].id).data(newVals[i])
                }
            }*/
           angular.forEach(oldVals, function (data, index) {
                if (graph.nodes('#' + data.id).data() !== data) {
                    graph.nodes('#' + data.id).data(newVals[index])
                }
                //angular.merge(graph.elements('#'+data.id).data(), data);
            })
        }


        function _processChange(newElements, oldElements, graph,scope){
            if(newElements.length === 0){
                graph.nodes().forEach(function(ele){
                    graph.remove(ele);
                });
            }
            if(graph.elements().length === 0){
                _addElements(newElements, graph, scope);
                return false;
            }
            var graphIndex = {};
            var newElementIndex = {};
            graph.elements().each(function(i, ele){
                graphIndex[ele.id()] = 1;
            });
            //To Add
            var toAdd = [];
            cytoHelpers.asyncEach(newElements,function(ele,index){
                newElementIndex[ele.data.id] = ele.data.id;
                if(ele.data && ele.data.id){
                    if(graphIndex[ele.data.id]){
                        //Check if cytoscape element data matches newElement data
                        var cytoElem = graph.nodes('#'+ele.data.id);
                        if(cytoElem.data() !== ele.data){
                            cytoElem.data(ele.data);
                        }
                    }else{
                        //It's new
                        toAdd.push((ele));
                    }
                    //No ID.  Add It
                }else{
                    toAdd.push((ele));

                }
            }).then(function(){
                    if(toAdd.length === 0){
                        //Must be removing something
                        graph.elements().each(function(i, ele){
                            if(!newElementIndex[ele.id()]){
                                var removeEleEdges = ele.neighborhood('edge').jsons();
                                var removeEdgeIndex = {};
                                angular.forEach(removeEleEdges, function(edge,i){
                                    removeEdgeIndex[edge.data.id] = edge.data.id;
                                });
                                for (var ind = newElements.length; ind--; ) {
                                    if (removeEdgeIndex[newElements[ind].data.id]){
                                        newElements.splice(ind, 1);
                                    }
                                }
                                graph.remove('#'+ele.id());
                            }
                        });
                    }else{
                        graph.add(toAdd);
                    }

                    graph.style().update();
                    graph.resize();
            });
        }
        function _addElements(elements, graph, _scope){
            if(areValidElements(elements)){
                    graph.add(elements);
                    graph.elements(':visible').layout(_scope.graphLayout || {name: 'cose'});
            }
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
})();