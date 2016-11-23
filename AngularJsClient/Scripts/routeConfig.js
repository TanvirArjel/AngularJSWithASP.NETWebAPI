app.config(function($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider.when("/",
    {
        templateUrl: "Temaplates/home.html"
    })
    .when("/products",
    {
        templateUrl: "Temaplates/products.html",
        controller: "productsController"
    })
    .when("/products/create",
        {
            templateUrl: "Temaplates/create.html",
            controller: "productCreateController"
        })
    .when("/products/edit/:id",
        {
            templateUrl: "Temaplates/edit.html",
            controller: "productEditController"
        })
    .when("/products/delete/:id",
        {
            templateUrl: "Temaplates/delete.html",
            controller: "productDeleteController"
        })
    .when("/products/details/:id",
        {
            templateUrl: "Temaplates/details.html",
            controller: "productDetailsController"
        })
    .otherwise({
            redirectTo : "/"
        })
    $locationProvider.html5Mode(true);
})