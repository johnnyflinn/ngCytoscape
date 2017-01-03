
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
            if(graph.elements().length === 0){
                angular.forEach(newEles, function(ele,index){
                    if(isValidElement(ele,index)){
                        toAdd.push(new Element(ele,index).ele);
                    }
                });

            }else{
                //Find what needs to be added and what needs to be removed.
                var diff = calcDiff(newEles, oldEles, graph);
                if(!isEmpty(diff.toAdd)){
                  angular.forEach(diff.toAdd, function(ele,index){
                      toAdd.push(new Element(ele,index).ele);
                  });
                }
                if(!isEmpty(diff.toUpdate)){
                    _batchToUpdate(diff.toUpdate, graph);
                }
                if(!isEmpty(diff.toRemove)){
                    removeCollection = graph.collection();
                    angular.forEach(diff.toRemove, function(ele,index){
                        removeCollection = removeCollection.add(graph.elements('#'+index));
                    });
                }
            }
            if(toAdd.length !== 0){
                graph.add(toAdd);
                //graph.layout(_scope.graphLayout || {name:'grid'});
            }
            if(removeCollection && removeCollection.length !== 0){
                graph.remove(removeCollection);
            }
            graph.style().update();
        }
        function _batchToUpdate(toUpdate,graph){
            graph.batch(function(){
                angular.forEach(toUpdate, function(ele){
                    graph.$('#'+ele.id)
                        .data(ele.data);
                });
                graph.style().update();
            });
        }
        function calcDiff(newEles, oldEles, graph) {
            var diff = {
                toAdd: {},
                toRemove: {},
                toUpdate: []
            };
            if (Object.keys(oldEles).length !== Object.keys(newEles).length) {
                for(var oIndex=0; oIndex<oldEles.length; oIndex++) {
                  if (!newEles[oIndex] || newEles[oIndex].data.id !== oldEles[oIndex].data.id) {
                    diff.toRemove[oIndex] = {};
                    angular.extend(diff.toRemove[oIndex], oldEles[oIndex]);
                    break;
                  }
                }
                angular.forEach(newEles, function (nEle, nIndex) {
                    if (!oldEles[nIndex]) {
                        diff.toAdd[nIndex] = {};
                        angular.extend(diff.toAdd[nIndex], nEle);
                    }
                });
            }
            return diff;
        }
        //Initial Load
        function _addAllElements(elements,graph,_scope) {
            var toAdd = [];
            var isValid = true;
            angular.forEach(elements, function(ele,index){
                if (isValidElement(ele, index)) {
                    toAdd.push(new Element(ele,index).ele);
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
        function Element(ele,index){
            this.ele = {};
            angular.extend(this.ele,ele);
            if(!this.ele.data.hasOwnProperty('id')){
                this.ele.data.id = index;
            }
            if(!this.hasOwnProperty('group')){
                if(this.ele.data.hasOwnProperty('target') && this.ele.data.hasOwnProperty('source')){
                    this.ele.group = 'edges';
                }else{
                    this.ele.group = 'nodes';
                }
            }
            return this;
        }
    }
})();