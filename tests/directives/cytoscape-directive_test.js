
'use strict';

describe('Directive: cytoscape', function(){
    var $compile;
    var $rootScope;
    var $timeout;
    var scope;
    var CytoscapeGraph;
    var cytoData;
beforeEach(module('angular-cytoscape'));
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

        console.log(scope)
    });
    it('should get instances of cytoscapejs', function() {
      // console.log(scope)
    });
});
