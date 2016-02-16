
(function() {
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoElementsHelpers', cytoElementsHelpers);
    cytoElementsHelpers.$inject = ['cytoHelpers', '$log'];
    function cytoElementsHelpers(cytoHelpers, $log) {
        var service = {
            addAllElements: _addAllElements,
            processChange:_processChange,
            elementsMap: {}
        };
        return service;

        function _processChange(newEles, oldEles, graph,_scope){
            var isEmpty = cytoHelpers.isEmpty;
            var toAdd = [];
            var removeCollection;
            //Remove All Elements
            if(isEmpty(newEles)){
                graph.remove(graph.elements());
                return;
            }
            //Add All Elements
            if(graph.elements().length === 0){
                angular.forEach(newEles, function(ele,index){
                    if(isValidElement(ele,index)){
                        toAdd.push(makeElement(ele,index))
                    }
                })

            }else{
                //Find what needs to be added and what needs to be removed.
                var diff = calcDiff(newEles, oldEles, graph);
                if(!isEmpty(diff.toAdd)){
                  angular.forEach(diff.toAdd, function(ele,index){
                      toAdd.push(makeElement(ele,index));
                  })
                };
                if(!isEmpty(diff.toRemove)){
                    removeCollection = graph.collection();
                    angular.forEach(diff.toRemove, function(ele,index){
                        removeCollection = removeCollection.add(graph.elements('#'+index));
                    })
                };
            };
            if(toAdd.length !== 0){
                graph.add(toAdd);
                graph.layout(_scope.graphLayout || {name:'grid'})
            }
            if(removeCollection && removeCollection.length !== 0){
                graph.remove(removeCollection);
            }
        };
        function calcDiff(newEles, oldEles, graph){
            var diff = {
                toAdd: {},
                toRemove: {}
            };
            angular.forEach(oldEles, function(oEle, oIndex){
                if(!newEles[oIndex]){
                    diff.toRemove[oIndex] = {};
                    angular.extend(diff.toRemove[oIndex], oEle);
                }
            });
            angular.forEach(newEles, function(nEle,nIndex){
                if(oldEles[nIndex]) {
                    var gEle = graph.elements('#'+nIndex);
                    if(gEle.data() !== nEle.data){
                        gEle.data(nEle.data);
                    }
                }else{
                        diff.toAdd[nIndex] = {};
                        angular.extend(diff.toAdd[nIndex], nEle)
                    }


            });
            return diff;
        }
        //Initial Load
        function _addAllElements(elements,graph,_scope) {
            var toAdd = [];
            var isValid = true;
            angular.forEach(elements, function(ele,index){
                if (isValidElement(ele, index)) {
                    toAdd.push(makeElement(ele, index))
                }else{
                    isValid = false;
                }
            });
            if(isValid){
                graph.add(toAdd);
            }
        }
        function makeElement(ele,index){
           var cyElement = {};
           angular.extend(cyElement,ele);
            //Add To Index
           service.elementsMap[index] = ele;
            //Ensure ID
           if(!cyElement.data.hasOwnProperty('id')){
               cyElement.data.id = index;
           }
           if(!cyElement.hasOwnProperty('group')){
                if(cyElement.data.hasOwnProperty('target') && cyElement.data.hasOwnProperty('source')){
                    cyElement.group = 'edges';
                }else{
                    cyElement.group = 'nodes';
                }
            }
            return cyElement;

        }
        function isValidElement(ele){
            var valid = true;
            if(!ele.hasOwnProperty('data')){
                $log.error('Elements require a data property',ele);
                valid = false;
            }
            return valid;
        }

    }
})();