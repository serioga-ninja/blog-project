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

                $scope.login = login = function (FormData) {
                    AuthRouter(FormData).$authenticate();
                }
            }
        ]);
})();