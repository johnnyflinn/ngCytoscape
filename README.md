angular-cytoscape
=============

A simple angular wrapper for the [Cytocape.js](http://js.cytoscape.org/) library.

Dependencies
-----------
jQuery

AngularJs

Angular-Cytoscape

##Installation

```javascript
<script src="pathToJquery/jquery.js"> 
<script src="pathToAngular/angular.js">
<script src="angular-cytoscape.js">
```
Include `angular-cytoscape` as a dependency in your application.

##Basic Example
HTML
```javascript
 <cytoscape graph-options="defaults" graph-elements="elements" graph-layout="layout" graph-style="style"></cytoscape>
```
Controller
```javascript
(function(){
 angular
  .module('app')
  .controller('example');
  example.$inject = ['$scope', 'cytoData']
  function example($scope, cytoData){
   $scope.defaults = {
    textureOnViewport:true,
    pixelRatio: 'auto',
    motionBlur: false,
    hideEdgesOnViewport:true
   };
   //See http://js.cytoscape.org/#collection/layout for available layouts and options
   $scope.layout = {name: 'grid'}
   // See http://js.cytoscape.org/#notation/elements-json for element array format
   $scope.elements = [
    { 
     group: 'nodes', // 'nodes' for a node, 'edges' for an edge
     data: { 
      id: 'n1', // mandatory for each element, assigned automatically on undefined
     },
    { 
     group: 'nodes', 
      data: { 
       id: 'n2', 
    },
    { // edge e1
     data: {
      id: 'e1',
    // inferred as an edge because `source` and `target` are specified:
       source: 'n1', // the source node id (edge comes from this node)
       target: 'n2'  // the target node id (edge goes to this node)
     }
    }
    ]
    $scope.style = [
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
Obtain the cytoscape graph core by making a call to cytoData.getGraph().  This will return a promise with the graph instance.
```javascript
$scope.graph = {};

cytoData.getGraph().then(function(cytoGraph){
 $scope.graph = cytoGraph;
})
```
Now all core functionality is available on $scope.graph
```javascript
$scope.graph.fit(); //Pan and zooms the graph to fit to a collection.
```
#### Adding a removing nodes / edges
Just push the node / edge object into your $scope.elements array.
IMPORTANT: Edges must have target and source nodes already defined.  Make sure you add these nodes before adding edges.

#### Data Object
The data property of nodes and edges are $watched.  Any changes to data will automatically updated in cytoscape.

#### Events
See <a href="http://js.cytoscape.org/#events"> cytoscape library</a> for more information.
* `cytoEvent:edge:event` Edge Events.
* `cytoEvent:node:event` Node Events.
* `cytoEvent:core:event` Core Events.
* `cytoEvent:core:event` Graph Events.

```javascript
$scope.$on('cytoEvent:node:select', function(node){
    console.log(node.data())
})
```
