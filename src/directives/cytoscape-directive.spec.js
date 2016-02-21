
'use strict';

describe('Directive: cytoscape', function(){
    var $compile;
    var $rootScope;
    var scope;
    var CytoscapeGraph;
    var cytoData;
    var element;
    beforeEach(module('ngCytoscape'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _cytoData_, _CytoscapeGraph_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        angular.extend(scope, {layout:{name:'circle'}});
        angular.extend(scope, {defaults:{zoomingEnabled:false}});
        angular.extend(scope, {elements:{
            n1:{
                data:{}
            }
        }});
        element = angular.element('<cytoscape graph-elements="elements" graph-layout="layout" graph-options="defaults"></cytoscape>');
        CytoscapeGraph = _CytoscapeGraph_;
        cytoData =_cytoData_;
        element = $compile(element)(scope);
        scope.$digest();

        spyOn($rootScope, '$broadcast').and.callThrough();

    }));
    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));
    it('should have loaded cytoscape inside the directive', function() {
         expect(element.find('canvas').length).toEqual(3);
    });
    it('should set defaults', function() {
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        expect(cyGraph.zoomingEnabled()).toEqual(false);
    });
    it('should add elements to the graph', function() {
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        expect(cyGraph.elements().length).toEqual(1);
    });
    it('should set layouts', function() {
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        expect(cyGraph._private.prevLayout.options.name).toEqual('circle');
    });
    it('should destroy graph', function(){
        $rootScope.$broadcast('$destroy');
        expect(element.find('canvas').length).toEqual(0);
    });
});
