(function () {
    "use strict";

    angular.module('blog-project')
        .controller('AuthController', [
            '$scope', 'AuthRouter',
            function ($scope, AuthRouter) {
                $scope.loginData = {
                    username: '',
                    password: ''
                };

                var login = $scope.login = function (FormData) {
                    AuthRouter(FormData).$authenticate();
                }
            }
        ]);
})();