app.controller("directories",function($scope,directoryfactory){

    $scope.loadDirectories=function(){
        var promise=directoryfactory.getDirectoriesList();
        promise.then(function(data){
            $scope.directoryList=data.data.data;
            $scope.directory=$scope.directoryList[0];
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.addDirectories=function(dto_obj){
        console.log(dto_obj);
        var promise=directoryfactory.addDirectories(dto_obj);
        promise.then(function(data){
            $scope.directoryList.push($scope.directory);
            console.log($scope.directory);
        },function(er){
            $scope.error=er;
        });
    };
    
    
    $scope.updateDirectory=function(dto_obj,index){
        console.log(dto_obj);
        var promise=directoryfactory.updateDirectories(dto_obj,dto_obj.id);
        promise.then(function(data){
            $scope.directoryList[index]=dto_obj;
            console.log(data);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.deleteDirectory=function(index,id){
    	var dto_obj=$scope.directoryList[index];
        var promise=directoryfactory.deleteDirectories(id);
            console.log("Calling delete directory");
        promise.then(function(data){
          $scope.directoryList.splice(index,1);
         console.log($scope.directoryList);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.resetFeilds=function(){   
     $scope.doDisable=false;  
    $scope.directory={};
    for(x in $scope.directory){
            	$scope.directory[x]="";
    }
    $scope.addMode=false; 
        
    };
    
    $scope.onAddMode=function(){
        $scope.addMode=true;
        $scope.directory=JSON.parse(JSON.stringify($scope.directory));
            for(var x in $scope.directory){
            	$scope.directory[x]="";
            }
    };
    
    $scope.manageAddorUpdateDirectories=function(){
        var dto_obj=$scope.directory;
        if($scope.doDisable===false&&$scope.addMode===true){
           $scope.addDirectories(dto_obj);
            console.log("calling add directory")
        }
        else if($scope.doDisable===false&&$scope.addMode===false){
            $scope.updateDirectory(dto_obj);
            console.log("Calling update directory");
        }
//         $scope.resetFeilds();
    }

});



var session_token=localStorage.getItem("session_token")
app.factory("directoryfactory",function($q,$http){
 var object={
     
     getDirectoriesList:function(){
         var pr=$q.defer();
         $http({
            url:origin+"admin_home/authority_directory?admin_session_token="+session_token,
        	method:"get"
//        	params:{method:"getuserlist"}
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     
     addDirectories:function(dto_obj){
         var pr=$q.defer();
         $http({
        	 method:"post",
        	 url:origin+"admin_home/create_authority_directory?admin_session_token="+session_token+"&name="+dto_obj.name+"&phone_number="+dto_obj.phone_number             
         }
         ).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     updateDirectories:function(dto_obj,id){
    	 var pr=$q.defer();
         console.log(dto_obj);
    	 $http({
        	 method:"post",
        	 url:origin+"admin_home/edit_authority_directory?directory_id="+id+"&name="+dto_obj.name+"&phone_number="+dto_obj.phone_number+"&admin_session_token="+session_token
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     deleteDirectories:function(id){
    	 var pr=$q.defer();
    	 $http({
        	 method:"post",
        	 url:origin+"admin_home/delete_authority_directory?admin_session_token="+session_token+"&directory_id="+id
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