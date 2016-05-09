(function () {
    var app = angular.module('blog-project', []);

    app.controller('StoreController', function () {
        this.products = [
            {title: 'qq'},
            {title: 'qq1'},
            {title: 'qq2'}
        ];
        this.test = 'aqqqq';
    });
})();
