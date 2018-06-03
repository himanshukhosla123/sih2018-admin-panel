app.controller("mydamctrl",function($scope,mydamfactory){

    $scope.loadDam=function(){
        var promise=mydamfactory.getDamsList();
        promise.then(function(data){
//            console.log(data);
            var id=localStorage.getItem("dam_obj");
            var damList=data.data.data;
            $scope.dam=damList.find(function(obj){
                return obj.id=id;
            });
            console.log($scope.dam);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(str){
        var a=parseInt(str);
        return new Date(a).toLocaleDateString();
    }
    
    $scope.addWaterRelease=function(dto_obj){
        var dto_obj=$scope.WaterRelease;
//        debugger;     
        console.log($scope.WaterReleaseList);
       
        var promise=mydamfactory.addWaterRelease(dto_obj);
        promise.then(function(data){
//            debugger;
            $scope.WaterReleaseList.push({description:dto_obj.description,datetime_timestamp:Date.now()});
            console.log($scope.WaterReleaseList);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.loadWaterRelease=function(){
        var promise=mydamfactory.getWaterReleaseList(localStorage.getItem("dam_obj"));
        promise.then(function(data){
            console.log(data);
            $scope.WaterReleaseList=data.data.data;
        },function(er){
            $scope.error=er;
        });
    }
    
    $scope.manageName=function(key){
        return key.replace(/_/g," ");
    }
    
    $scope.getKeys=function(dto_obj){
        delete dto_obj.$$hashKey;
        let arr=[],keys=Object.keys(dto_obj);
         for(var temp in keys){
          if(keys[temp]=="id"||keys[temp]=="$$hashkey"){}
          else arr.push(keys[temp]);
         }
        console.log(keys.length,arr.length)
        return arr;
    }
    
    $scope.updateWaterRelease=function(dto_obj,index){
        console.log(dto_obj);
        var promise=mydamfactory.updateDam(dto_obj);
        promise.then(function(data){
            $scope.WaterReleaseList[index]=dto_obj;
            console.log(data);
        },function(er){
            $scope.error=er;
        });
    };
    $scope.readWaterRelease=function(index,doDisable){
        $scope.doDisable=doDisable;
        var dto_obj=$scope.WaterReleaseList[index];
            $scope.WaterRelease=dto_obj;
//             debugger;
            for(x in $scope.WaterRelease){
            	$scope.WaterRelease[x]=dto_obj[x];
            }
    };
    
    $scope.resetFeilds=function(){   
     $scope.doDisable=false;  
//    $scope.WaterRelease=;
    for(x in $scope.WaterRelease){
            	$scope.WaterRelease[x]="";
    }
    $scope.addMode=false; 
        
    };
    
    $scope.onAddMode=function(){
        $scope.addMode=true;
        $scope.WaterRelease=JSON.parse(JSON.stringify($scope.WaterRelease||{}));
            for(var x in $scope.WaterRelease){
            	$scope.WaterRelease[x]="";
            }
        $scope.doDisable=false;
    };
    
    $scope.manageAddorUpdateWaterRelease=function(){
        var dto_obj=$scope.WaterRelease;
        debugger;
        if($scope.doDisable==false&&$scope.addMode==true){
           $scope.addWaterRelease(dto_obj);
            console.log("calling add dam")
        }
        else if($scope.doDisable==false&&$scope.addMode==false){
            $scope.updateWaterRelease(dto_obj);
            console.log("Calling update dam");
        }
//         $scope.resetFeilds();
    }
});




var session_token=localStorage.getItem("session_token");
app.factory("mydamfactory",function($q,$http){
 var object={
     
     getDamsList:function(){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/dams",
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     getWaterReleaseList:function(id){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/dam_water_release_detail?dam_id="+id,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },addWaterRelease:function(obj){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/create_dam_water_release?dam_id="+localStorage.getItem("dam_obj")+"&admin_session_token="+session_token+"&description="+obj.description+"&datetime_timestamp="+Date.now(),
        	method:"POST"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },updateWaterRelease:function(obj){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/update_water_release?admin_session_token="+session_token+"&datetime_timestamp="+Date.now()+"&description="+obj.description,
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




