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
  });
