(function () {
    'use strict';

    angular.module('blog-project')
        .service('AuthRouter', ['$resource', 'RoutingHelper',

            function ($resource, RoutingHelper) {
                return $resource(RoutingHelper.buildApiUrl('auth'),
                    {}, {
                        authenticate: {method: 'POST'}
                    });
            }
        ]);
})();