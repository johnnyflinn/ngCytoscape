
'use strict';

describe('Directive: cytoscape', function(){
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
    it('should have loaded cytoscape inside the directive', function() {
        var element = angular.element('<cytoscape></cytoscape>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.find('canvas').length).toEqual(3);
    });
    it('should set defaults', function() {
        angular.extend(scope, {defaults:{zoomingEnabled:false}});
        var element = angular.element('<cytoscape graph-options="defaults"></cytoscape>');
        element = $compile(element)(scope);
        var cyGraph;
        cytoData.getGraph().then(function(graph){
            cyGraph = graph;
        });
        scope.$digest();
        console.log(cyGraph.zoomingEnabled());
        expect(cyGraph.zoomingEnabled()).toEqual(false);
    });
});
