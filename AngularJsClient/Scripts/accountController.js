app.constant('serviceBasePath', 'http://localhost:43618/');

app.controller('loginController', ['$scope',"$http", '$window', 'accountService', '$location', function ($scope,$http, $window, accountService, $location) {
    
    $scope.loginPageHeader = "Login Page";

    $scope.registerUser = function (user) {
        console.log(user);
        $http.post('http://localhost:43618/api/Account/Register', user)
            .success(function () {
                alert("User Register Successfully");
                $location.path("/home");
            });
    }

    $scope.account = {
        username: '',
        password: ''
    }
    $scope.login = function () {
        accountService.login($scope.account).then(function (data) {
            $location.path('/home');
            $window.location.reload(true);
        }, function (error) {
            $scope.message = error.error_description;
        })
    }
   
}])