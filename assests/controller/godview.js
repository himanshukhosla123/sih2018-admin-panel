app.controller("godview",function($scope,viewfactory){

    $scope.loadDams=function(){
        var promise=viewfactory.getDamsList();
        promise.then(function(data){
//            console.log(data);
            $scope.damList=data.data.data;
            $scope.dam=$scope.damList[0];
        },function(er){
            $scope.error=er;
        });
    };
    var map=null;
    $scope.manageName=function(key){
        return key.replace(/_/g," ");
    }
    $scope.loadView=function(){
        var timer =setInterval(function(){
             if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(trigger);
             } else {
        document.getElementById("map").innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
        }
        },5000);
    }
    
    var count=0;
    
    function setMap(position){
        count++;
        if(count>1)return;
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center:{lat:position.coords.latitude, lng: position.coords.longitude}
           });
     }
    var markersNeedHelp=[],markersProvideHelp=[];
    function trigger(position){
         setMap(position);
                                         
      viewfactory.getNeedPeopleList(position).then(function(data){
//            debugger;
           
//            markersProvideHelp.map(function(obj){
//                obj.setMap(null);
//            })
        markersNeedHelp = data.data.data.map(function(obj, i) {
          return new google.maps.Marker({
            position:{lat:obj.latitude,lng:obj.longitude},
            label:obj.user.name,
             map:map
        });
        

//        var markerCluster = new MarkerClusterer(map, markers,
//            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//        }
        },function(er){
            $scope.error=er;
        });
            
    })  ;
        
      viewfactory.getPeopleProvideHelpList(position).then(function(data){
//            debugger;
//            markersProvideHelp.map(function(obj){
//                obj.setMap(null);
//            })
            markersProvideHelp = data.data.data.map(function(obj, i) {
          return new google.maps.Marker({
            position:{lat:obj.latitude,lng:obj.longitude},
            label:obj.user.name,
             map:map, 
//              size:new google.maps.Size(20,32), icon:"https://camo.githubusercontent.com/e8783c1b9fc99532bedbab3b8df9ce1b03d6f70b/68747470733a2f2f7777772e6272696172636c6966662e6564752f6d656469612f3339343033372f6d61726b65722e706e67",  
          });
        });
        },function(er){
            $scope.error=er;
        });
    }
    
});


var session_token=localStorage.getItem("session_token");
app.factory("viewfactory",function($q,$http){
 var object={
     
     getNeedPeopleList:function(position){
//         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/get_list_who_need_help?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&admin_session_token="+session_token,
            method:"POST"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     getPeopleProvideHelpList:function(position){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/get_nearby_people?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&admin_session_token="+session_token,
            method:"POST"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     
     
     
 };
     
    console.log("server call");
    return object;
});




