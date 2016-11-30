var serviceBase = 'http://localhost:43618/';
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider.when("/",
    {
        templateUrl: "Temaplates/home.html",

    })
    .when("/products",
    {
        templateUrl: "Temaplates/products.html",
        controller: "productsController",
        resolve : {
            productList: function ($http) {
               return  $http.get("http://localhost:43618/api/Products")
                     .then(function (response) {
                         return  response.data;
                     })
            }
        }
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
    //.when("/register",
    //    {
    //        templateUrl: "Temaplates/register.html",
    //        controller: "registerController"
    //    })
     .when("/login",
        {
            templateUrl: "Temaplates/login.html",
            controller: "loginController"
        })
    .otherwise({
            redirectTo : "/"
        })
    $locationProvider.html5Mode(true);
})
.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function(userService, $q, $location)
    {
        return {
            request: function (config) {
                var currentUser = userService.GetCurrentUser();
                if (currentUser != null) {
                    config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return config;
            },
            responseError : function(rejection)
            {
                if (rejection.status === 401) {
                    $location.path('/login');
                    return $q.reject(rejection);
                }
                if (rejection.status === 403) {
                    $location.path('/unauthorized');
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
 
        }
    }
    var params = ['userService', '$q', '$location'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);