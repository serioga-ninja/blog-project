(function () {
    var app = angular.module('blog-project', [
        'ui.router'
    ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $stateProvider.state("guest", {
            abstract: true,
            templateUrl: "app/templates/basics/guest.html"
        }).state('user', {
            abstract: true,
            templateUrl: 'app/templates/basics/user.html'
        }).state('single-form', {
            abstract: true,
            templateUrl: 'app/templates/basics/form.html'
        }).state('login', {
            url: '/login',
            parent: 'single-form',
            templateUrl: 'app/templates/auth/login.html'
        });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/login");

    }).run(function ($rootScope, $urlRouter) {
        console.log('run!');
    });
})();
