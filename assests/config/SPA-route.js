app.config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');
    $routeProvider.when("/",{
        templateUrl:"dms-web/dashboard.html",
//        controller:"homeCtrl"
    }).when("/dashboard",{
        templateUrl:"dms-web/dashboard.html",
//        controller:"homeCtrl"
    }).when("/dams",{
        templateUrl:"dms-web/dams.html",
//        controller:"damctrl"
    }).when("/mydam",{
        templateUrl:"dms-web/mydam.html",
//        controller:"mydamctrl"
    }).when("/directories",{
        templateUrl:"dms-web/directories.html",
        controller:"directories"
    }).when("/alerts",{
        templateUrl:"dms-web/alerts.html",
        controller:"notification"
    }).when("/calendar",{
        templateUrl:"dms-web/calendar.html",
        controller:""
    }).when("/reports",{
        templateUrl:"dms-web/reports.html",
        controller:""
    }).when("/godview",{
        templateUrl:"dms-web/godview.html",
        controller:""
    }).otherwise({template:"Error Page , No Match Found"
        ,redirectTo:"/dashboard"});
});