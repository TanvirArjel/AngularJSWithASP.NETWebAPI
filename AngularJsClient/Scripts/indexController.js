app.controller('indexController', ['$scope', 'accountService', '$location', '$window', function ($scope, accountService, $location, $window) {

    $scope.authentication = localStorage.getItem("IsAuthenticated");
    $scope.userName = localStorage.getItem("userName");
    console.log($scope.userName);

    $scope.logout = function () {
        accountService.logout();
        $location.path('/login');
        $window.location.reload(true);
    }
        
 }])
