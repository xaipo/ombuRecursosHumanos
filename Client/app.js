


var app = angular.module("myApp", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider)  {
    $routeProvider
        .when("/", {
            templateUrl : "partials/index.html"
        })
        .when("/test", {
            templateUrl : "partials/test2.html"
        })
        .when("/green", {
            templateUrl : "green.htm"
        })
        .when("/blue", {
            templateUrl : "blue.htm"
        });
       // $locationProvider.html5Mode({enable:true,requireBase:false});
}]);

/*
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when("/",{templateUrl:"./partials/index.html"} );
    $routeProvider.when("/test",{templateUrl:"./partials/test2.html"});
    $routeProvider.otherwise({redirectTo:'/'});
    $locationProvider.html5Mode({enable:true,requireBase:false});

}]);
*/

   // $locationProvider.html5Mode(true);
  /*  $routeProvider.when("/",{templateUrl:"./partials/index.html"} );
    $routeProvider.when("/test",{templateUrl:"./partials/test2.html"});
    $routeProvider.when("/newHistory",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/newClinicHistory.html", controller:'HistoriaClinicaController'});
    $routeProvider.when("/first",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/first.html", controller:'HistoriaClinicaController'});
    $routeProvider.when("/second",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/second.html", controller:'HistoriaClinicaController'});
    $routeProvider.otherwise({redirectTo:'/'});
    $locationProvider.html5Mode({enable:true,requireBase:false});*/
    /*$provide.factory("ApiUrl", function () {
     return {
     urlUsuarios: 'http://localhost:3000/api/usuarios'
     };
     })*/

    //$provide.value('urlUsuarios', 'http://localhost:3000/api/usuarios');








//('urlUsuarios', 'http://localhost:3000/api/usuarios');



/*app.config(['$routeProvider', function ($routeProvider) {
 $routeProvider.when('/newEmpresa', { templateUrl: '/tesisSaludOcupacional/Client/Administrator/newEmpresa.html', controller: 'EmpresaController' });
 $routeProvider.when('/', { templateUrl: '/indexAdmin.html' });
 $routeProvider.otherwise({ redirectTo: '/error' });
 }]);*/