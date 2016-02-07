
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
        //var isolated = element.isolateScope();


    });
    it('should add elements', function() {
      // console.log(scope)
    });
    it('should run layout', function() {
      // console.log(scope)
    });
});
