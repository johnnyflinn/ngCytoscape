(function(){
    'use strict';

    angular
        .module('ngCytoscape')
        .service('cytoHelpers', cytoHelpers);
    cytoHelpers.$inject=['$q'];
    function cytoHelpers($q){
        var _errorHeader = '[AngularJS - Cytoscape] ';
        var _copy = angular.copy;
        var _clone = _copy;

        function _executeFunctionByName( functionName, context /*, args */ ) {
            var args, namespaces, func;

            if( typeof functionName === 'undefined' ) { throw 'function name not specified'; }

            //if( typeof eval( functionName ) !== 'function' ) { throw functionName + ' is not a function'; }

            if( typeof context === 'undefined' ) {
                context = window;
            }

            if( typeof context === 'object' && context instanceof Array === false ) {
                if( typeof context[ functionName ] !== 'function' ) {
                    throw context + '.' + functionName + ' is not a function';
                }
                args = Array.prototype.slice.call( arguments, 2 );

            } else {
                args = Array.prototype.slice.call( arguments, 1 );
                context = window;
            }

            namespaces = functionName.split( "." );
            func = namespaces.pop();

            for( var i = 0; i < namespaces.length; i++ ) {
                context = context[ namespaces[ i ] ];
            }

            return context[ func ].apply( context, args );
        }

        function _obtainEffectiveGraphId(d, graphId) {
            var id;
            var i;
            if (!angular.isDefined(graphId)) {
                if (Object.keys(d).length === 0) {
                    id = 'ngCyMain';
                } else if (Object.keys(d).length >= 1) {
                    for (i in d) {
                        if (d.hasOwnProperty(i)) {
                            id = i;
                        }
                    }
                } else {
                    $log.error(_errorHeader + '- You have more than 1 graph on the DOM, you must provide the graph ID to the cytoData.geGraph call');
                }
            } else {
                id = graphId;
            }

            return id;
        }

        function _getUnresolvedDefer(d, graphId) {
            var id = _obtainEffectiveGraphId(d, graphId);
            var defer;

            if (!angular.isDefined(d[id]) || d[id].resolvedDefer === true) {
                defer = $q.defer();
                d[id] = {
                    defer: defer,
                    resolvedDefer: false
                };
            } else {
                defer = d[id].defer;
            }

            return defer;
        }

        var _isDefined = function(value) {
            return angular.isDefined(value) && value !== null;
        };

        var _isUndefined = function(value) {
            return !_isDefined(value);
        };

        return {
            copy:_copy,
            clone:_clone,
            defaultTo: function(val, _default) {
                return _isDefined(val) ? val : _default;
            },

            //mainly for checking attributes of directives lets keep this minimal (on what we accept)
            isTruthy: function(val) {
                return val === 'true' || val === true;
            },

            //Determine if a reference is {}
            isEmpty: function(value) {
                return Object.keys(value).length === 0;
            },

            //Determine if a reference is undefined or {}
            isUndefinedOrEmpty: function(value) {
                return (angular.isUndefined(value) || value === null) || Object.keys(value).length === 0;
            },

            // Determine if a reference is defined
            isDefined: _isDefined,
            isUndefined:_isUndefined,
            isNumber: angular.isNumber,
            isString: angular.isString,
            isArray: angular.isArray,
            isObject: angular.isObject,
            isFunction: angular.isFunction,
            equals: angular.equals,

            safeApply: function (scope, fn) {
                var phase = scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest')
                    scope.$eval(fn);
                else
                    scope.$apply(fn);
            },
            asyncEach: function(array, fn, maxTimePerChunk, context){
                var deferred = $q.defer();
                var length = array.length;
                context = context || window;
                maxTimePerChunk = maxTimePerChunk || 200;
                var index = 0;

                function now() {
                    return new Date().getTime();
                }

                function doChunk() {
                    var startTime = now();

                    while (index < length && (now() - startTime) <= maxTimePerChunk) {
                        // callback called with args (value, index, array)
                        fn.call(context, array[index], index, array);
                        ++index;
                    }
                    if (index < length) {
                        // set Timeout for async iteration
                        setTimeout(doChunk, 1);
                    }else if(index === length){
                        deferred.resolve();
                    }
                }
                doChunk();
                return deferred.promise;
            },

            executeFunctionByName: _executeFunctionByName,

            obtainEffectiveGraphId: _obtainEffectiveGraphId,

            getDefer: function(d, graphId) {
                var id = _obtainEffectiveGraphId(d, graphId);
                var defer;
                if (!angular.isDefined(d[id]) || d[id].resolvedDefer === false) {
                    defer = _getUnresolvedDefer(d, graphId);
                } else {
                    defer = d[id].defer;
                }

                return defer;
            },

            getUnresolvedDefer: _getUnresolvedDefer,

            setResolvedDefer: function(d, graphId) {
                var id = _obtainEffectiveGraphId(d, graphId);
                d[id].resolvedDefer = true;
            }

        };
    }
})();