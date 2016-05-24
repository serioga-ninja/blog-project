/**
 * Created by serioga on 20.05.16.
 */
(function () {
    'use strict';

    angular.module('blog-project')
        .factory('RoutingHelper', [
            'Config',
            function (Config) {
                var _this = {
                    buildApiUrl: buildApiUrl
                };

                return _this;

                function buildApiUrl(path) {
                    return [Config.domainName, 'api', Config.apiVersion, path].join('/');
                }
            }
        ]);

})();