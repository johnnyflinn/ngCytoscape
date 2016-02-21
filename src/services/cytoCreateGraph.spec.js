'use strict';
describe('Factory: cytoCreateGraph', function(){
    var CytoscapeGraph;
    beforeEach(module('ngCytoscape'));
    beforeEach(inject(function(_CytoscapeGraph_){
        CytoscapeGraph = _CytoscapeGraph_;
    }));
    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));
    it('should create graph instance', function(){
        var cy = new CytoscapeGraph();
        var pass = false;
        if(cy.hasOwnProperty('_private')){
            pass = true;
        }
        expect(pass).toBe(true);
    });
});