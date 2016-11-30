app.factory('productService',
  function ($http, $routeParams) {
      return {
          getDataById: function () {
              //return promise from here
              return $http.get("http://localhost:43618/api/Products", {
                  params: { id: $routeParams.id }
              });
          }
      };
  })



app.factory('userService', function () {
    var fac = {};
    fac.CurrentUser = null;
    fac.SetCurrentUser = function (user) {
        fac.CurrentUser = user;
        sessionStorage.user = angular.toJson(user);
        
    }
    fac.GetCurrentUser = function () {
        fac.CurrentUser = angular.fromJson(sessionStorage.user);
        return fac.CurrentUser;
    }
    return fac;
})




app.factory('accountService', ['$http', '$q', 'serviceBasePath', 'userService', '$window', function ($http, $q, serviceBasePath, userService, $window) {
    var fac = {};
    fac.login = function (user) {
        var obj = { 'username': user.username, 'password': user.password, 'grant_type': 'password' };
        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        var defer = $q.defer();
        $http({
            method: 'post',
            url: serviceBasePath + "/token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log(user.username);
            userService.SetCurrentUser(response.data);
            localStorage.setItem('IsAuthenticated', true);
            localStorage.setItem('userName', user.username);
            

            defer.resolve(response.data);
        }, function (error) {
            defer.reject(error.data);
        })
        return defer.promise;
    }
    fac.logout = function () {
        userService.CurrentUser = null;
        userService.SetCurrentUser(userService.CurrentUser);
        localStorage.removeItem('IsAuthenticated');
        localStorage.removeItem('userName');

    }
    return fac;
}])