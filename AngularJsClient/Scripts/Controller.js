app.controller("productsController", function ($scope, $http, productList) {
    $scope.message = "Product Page";
    $scope.products = productList;


    })
   .controller("productCreateController", function ($scope, $http, $location) {
       $scope.message = "Create Page";
       $scope.product = {};
       $scope.createProduct = function (product) {
           $http.post('http://localhost:43618/api/Products', product)
               .success(function () {
                   alert("Product Created Successfully");
                   $location.path('/products');

               });
       }

   })
 .controller("productDetailsController", function ($scope, $http, $routeParams, $location, productService) {
     $scope.message = "Product Details";
     productService.getDataById().then(function (response) {
         $scope.product = response.data;
     }, function (error) {
         console.log("Error occured ", error);
     });

     //First I wrote the following code in every controller where it needed. but it produced lots of code duplication and hence move this 
     //code into a angularjs service named "productService"(which is in factory.js file) and then inject the service into each controller 
     //it needded and called the service method name "getDataById()".

    // $http({
    //     method: "GET",
    //     url: "http://localhost:43618/api/Products",
    //     params: { id: $routeParams.id }
    // })
    //.then(function (response) {
    //    console.log(response);
    //    $scope.product = response.data;
    //})

 })
.controller("productEditController", function ($scope, $http, $routeParams, $location, productService) {
    $scope.message = "Edit Page";
    $scope.product = {};

    productService.getDataById().then(function (response) {
        $scope.product = response.data;
    }, function (error) {
        console.log("Error occured ", error);
    });

    //First I wrote the following code in every controller where it needed. but it produced lots of code duplication and hence move this 
    //code into a angularjs service named "productService"(which is in factory.js file) and then inject the service into each controller 
    //it needded and called the service method name "getDataById()".

    //    $http({
    //        method: "GET",
    //        url: "http://localhost:43618/api/Products",
    //        params: { id: $routeParams.id }
    //    })
    //    .then(function (response) {
    //        $scope.product = response.data;
    //    })
    $scope.updateProduct = function (product) {
        $http({
            method: "PUT",
            url: "http://localhost:43618/api/Products",
            params: { id: $routeParams.id },
            data: product
        })
        .success(function () {
            alert("Product Updated Successfully");
            $location.path('/products');
        });
    }

})

.controller("productDeleteController", function ($scope, productService, $http, $routeParams, $location) {
    $scope.message = "Delete Page";

    productService.getDataById().then(function (response) {
        $scope.product = response.data;
    }, function (error) {
        console.log("Error occured ", error);
    });

    //First I wrote the following code in every controller where it needed. but it produced lots of code duplication and hence move this 
    //code into a angularjs service named "productService"(which is in factory.js file) and then inject the service into each controller 
    //it needded and called the service method name "getDataById()".

    //$scope.loadData = function () {
    //    $http({
    //        method: "GET",
    //        url: "http://localhost:43618/api/Products",
    //        params: { id: $routeParams.id }
    //    })
    //    .then(function (response) {
    //        $scope.product = response.data;
    //    })
    //}
    $scope.deleteProduct = function () {
        $http({
            method: "Delete",
            url: "http://localhost:43618/api/Products",
            params: { id: $routeParams.id },
            //data: product
        })
        .success(function () {
            alert("Product Deleted Successfully");
            $location.path('/products');
        });
    }

})