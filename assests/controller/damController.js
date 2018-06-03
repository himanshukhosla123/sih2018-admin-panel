app.controller("damctrl",function($scope,damfactory){

    $scope.loadDams=function(){
        var promise=damfactory.getDamsList();
        promise.then(function(data){
//            console.log(data);
            $scope.damList=data.data.data;
            $scope.dam=$scope.damList[0];
        },function(er){
            $scope.error=er;
        });
    };
    
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
//        console.log(keys.length,arr.length)
        return arr;
    }
    
    $scope.updateDam=function(dto_obj,index){
        console.log(dto_obj);
//        var promise=damfactory.updateDam(dto_obj);
//        promise.then(function(data){
            $scope.damList[index]=dto_obj;
//            console.log(data);
//        },function(er){
//            $scope.error=er;
//        });
    };
    $scope.readDam=function(index,doDisable){
        $scope.doDisable=doDisable;
        var dto_obj=$scope.damList[index];
            $scope.dam=dto_obj;
//             debugger;
            for(x in $scope.dam){
            	$scope.dam[x]=dto_obj[x];
            }
    };
    
    $scope.resetFeilds=function(){   
     $scope.doDisable=false;  
    $scope.dam={};
    for(x in $scope.dam){
            	$scope.dam[x]="";
    }
    $scope.addMode=false; 
        
    };
    
    $scope.onAddMode=function(){
        $scope.addMode=true;
        $scope.dam=JSON.parse(JSON.stringify($scope.dam));
            for(var x in $scope.dam){
            	$scope.dam[x]="";
            }
    };
    
    $scope.manageAddorUpdateDam=function(){
        var dto_obj=$scope.dam;
        if($scope.doDisable===false&&$scope.addMode===true){
           $scope.addDam(dto_obj);
            console.log("calling add dam")
        }
        else if($scope.doDisable===false&&$scope.addMode===false){
            $scope.updateDam(dto_obj);
            console.log("Calling update dam");
        }
//         $scope.resetFeilds();
    }
});


var session_token=localStorage.getItem("session_token");
app.factory("damfactory",function($q,$http){
 var object={
     
     getDamsList:function(page){
         page=page||0;
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
     updateDam:function(page){
         page=page||0;
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
     
     
 };
     
    console.log("server call");
    return object;
});




