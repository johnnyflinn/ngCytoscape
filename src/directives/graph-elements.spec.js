
'use strict';

describe('Directive: graph-elements', function(){
    var $compile;
    var $rootScope;
    var scope;
    var CytoscapeGraph;
    var cytoData;
    beforeEach(module('ngCytoscape'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _cytoData_, _CytoscapeGraph_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        var element = '<cytoscape></cytoscape>';
        CytoscapeGraph = _CytoscapeGraph_;
        cytoData =_cytoData_;
        element = $compile(element)(scope);
        scope.$digest();
    }));
    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));
    it('should add new elements', function() {
        angular.extend(scope, {elements:{
            n1:{
                data:{}
            }
        }});
        var element = angular.element('<cytoscape graph-elements="elements"></cytoscape>');
        element = $compile(element)(scope);
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        angular.extend(scope.elements,{
            n2:{
                data:{}
            }
        });
        scope.$digest();
        expect(cyGraph.elements().length).toEqual(2);
    });
    it('should remove all elements', function() {
        angular.extend(scope, {elements:{
            n1:{
                data:{}
            }
        }});
        var element = angular.element('<cytoscape graph-elements="elements"></cytoscape>');
        element = $compile(element)(scope);
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        scope.elements = {};
        scope.$digest();
        expect(cyGraph.elements().length).toEqual(0);
    });
    it('should update data property', function() {
        angular.extend(scope, {elements:{
            n1:{
                data:{
                    weight: 5
                }
            }
        }});
        var element = angular.element('<cytoscape graph-elements="elements"></cytoscape>');
        element = $compile(element)(scope);
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        scope.elements.n1.data.weight = 10;
        scope.$digest();
        expect(cyGraph.elements('#n1').data().weight).toEqual(10);
    });
});
