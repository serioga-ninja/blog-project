(function () {
    var app = angular.module('blog-project', [
        'ui.router',
        'ngResource'
    ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $stateProvider.state("guest", {
            abstract: true,
            templateUrl: "templates/basics/guest.html"
        }).state('user', {
            abstract: true,
            templateUrl: 'templates/basics/user.html'
        }).state('single-form', {
            abstract: true,
            templateUrl: 'templates/basics/form.html'
        }).state('login', {
            url: '/login',
            parent: 'single-form',
            templateUrl: 'templates/auth/login.html',
            controller: 'AuthController',
            controllerAs: 'Auth'
        });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/login");

    }).run(function ($rootScope, $urlRouter) {
        console.log('run!');
    });
})();
