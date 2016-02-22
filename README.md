ngCytoscape
=============

A simple angular wrapper for the [Cytocape.js](http://js.cytoscape.org/) library.

v0.0.5 [![Build Status](https://travis-ci.org/johnnyflinn/ngCytoscape.svg?branch=v0.0.4)](https://travis-ci.org/johnnyflinn/ngCytoscape)
Master [![Build Status](https://travis-ci.org/johnnyflinn/ngCytoscape.svg?branch=master)](https://travis-ci.org/johnnyflinn/ngCytoscape)


Demos
-----------
Visit the [Demo Page](http://johnnyflinn.github.io/ngCytoscape) for detailed set-up and usage.

Dependencies
-----------
AngularJs
Cytoscape.js

##Installation

```javascript
bower install ngCytoscape
npm install
```
```javascript
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/cytoscape/dist/cytoscape.js"></script>
<script src="bower_components/ngCytoscape/dst/ngCytoscape.js">
```
Include `ngCytoscape` as a dependency in your application.

##Basic Example
HTML
```javascript
 <cytoscape graph-options="options" graph-elements="elements" graph-layout="layout" graph-style="style"></cytoscape>
```
Controller
```javascript
(function(){
 angular
  .module('app')
  .controller('example');
  example.$inject = ['$scope', 'cytoData']
  function example($scope, cytoData){
   $scope.options = { //See http://js.cytoscape.org/#core/initialisation for core options
    textureOnViewport:true,
    pixelRatio: 'auto',
    motionBlur: false,
    hideEdgesOnViewport:true
   };
 
   $scope.layout = {name: 'grid'}   //See http://js.cytoscape.org/#collection/layout for available layouts and options
   
   $scope.elements = {
    n1:{
     group: 'nodes',
     data:{} //Data property mandatory for all elements
    },
    n2:{
     group: 'nodes',
     data:{}
    }
    e1:{
     group:'edges',
     data:{
      target: n1,  //Source and Target mandatory for edges.
      source: n2
     }
    }
   }
    $scope.style = [ // See http://js.cytoscape.org/#style for style formatting and options.
      {
            selector: 'node',
            style: {
                'shape': 'ellipse',
                'border-width': 0,
                'background-color': 'blue'
            }
        }
    ]
  }
}();
```

#### cytoscape instance
Inject cytoData in your controller as a dependency. Obtain the cytoscape graph core by making a call to cytoData.getGraph().   This will return a promise with the graph instance.  If you have multiple graphs, they must contain an id property.  Then you can pass the id to cytoData.getGraph('id') to obtain the corresponding graph instance.
```javascript
//Single Graph Instance
(function(){
 angular
  .module('app')
  .controller('example');
  
  example.$inject = ['$scope', 'cytoData']S
  
  function example($scope, cytoData){
      $scope.graph = {};
      cytoData.getGraph().then(function(graph){
        $scope.graph = graph;
      }
  }
}();
```
Now all core functionality is available on $scope.graph
```javascript
$scope.graph.fit(); //Pan and zooms the graph to fit to a collection.
```
#### Adding a removing nodes / edges
Just extend the node / edge object onto your $scope.elements object.  Removing a node WILL remove it's connected edges from the graph, but WILL NOT remove them from your $scope.elements object.  

#### Data Object
The data property of nodes and edges are $watched.  Any changes to data will automatically updated in cytoscape.

#### Events
See <a href="http://js.cytoscape.org/#events"> cytoscape library</a> for more information.
* `cy:edge:<event>` Edge Events.
* `cy:node:<event>` Node Events.
* `cy:core:<event>` Core Events.
* `cy:graph:<event>` Graph Events.

```javascript
$scope.$on('cy:node:click', function(ng,cy){
    var node = cy.cyTarget;
    console.log(node.data())
});
```
