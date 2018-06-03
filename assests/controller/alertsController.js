app.controller("notification",function($scope,notificationFactory){
 $scope.noAlert=false;
  $scope.alert={};
    
    $scope.noNotification=false;  
    $scope.loadNotifications=function(){
        var promise=notificationFactory.getNotifications();
        promise.then(function(data){
            console.log(data.data.data);
            var notifications=data.data.data;
            $scope.alerts=notifications;
            if($scope.alerts.length==0)
                $scope.noAlert=true;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.setCurrentAlert=function(x){
        $scope.alert=x;
        $scope.getLocation();
    }
    
    
    $scope.getUser=function(obj){
      
        var promise=notificationFactory.getUser(obj.user_id);
        promise.then(function(data){
//            console.log(data.data.data);
            obj.user=data.data.data[0];
        },function(er){
            $scope.error=er;
        });
    }
    
    
    $scope.getLocation=function(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(requestHelp);
     } else {
        document.getElementById("map").innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
     }
    }
    
    $scope.getLocation();
    
    function requestHelp(position){
//            $scope.loadMap(position.coords.latitude,position.coords.longitude);
        showDestination(position.coords.latitude,position.coords.longitude);
    }
    
    
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }
    
    var directionsService=null,map=null,directionsDisplay=null;
    
    function showDestination(lat,long){
        var needHelpObj=$scope.alert;
        
        if(!(lat&&long))
         return;
//        debugger;
        var needHelpLocation = {lat: needHelpObj.latitude, lng: needHelpObj.longitude};
        var adminObj={lat:lat+1.0,lng:long+1.0};
    
        console.log(needHelpLocation,adminObj)
        if(!map)
        var map =new google.maps.Map(document.getElementById('map'), {
          center:adminObj,
          zoom:7
        });
//        else map.set

        directionsDisplay=new google.maps.DirectionsRenderer({
          map:map
        });

        // Set destination, origin and travel mode.
        var request = {
          destination:needHelpLocation,
          origin:adminObj,
          travelMode:'DRIVING'
        };

        // Pass the directions request to the directions service.
        directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') 
            directionsDisplay.setDirections(response);
        });
    }

});



var session_token=localStorage.getItem("session_token");
app.factory("notificationFactory",function($q,$http){
 var object={
     
     getNotifications:function(){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/help_me_list?admin_session_token="+session_token,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     getUser:function(id){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/user_detail?user_id="+id,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     }
 };
     
    console.log("server call");
    return object;
});