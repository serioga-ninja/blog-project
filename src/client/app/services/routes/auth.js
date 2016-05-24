(function () {
    'use strict';

    angular.module('blog-project')
        .factory('AuthRouter', ['$resource', 'RoutingHelper',

            function ($resource, RoutingHelper) {
                return $resource(RoutingHelper.buildApiUrl('auth'),
                    {}, {
                        authenticate: {method: 'POST'}
                    });
            }
        ]);
})();