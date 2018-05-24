app.controller('controller',function($scope){

    //$scope.username;
    //$scope.password;

    $scope.login=function(){
        if($scope.username=="123" && $scope.password=="123"){
            alert("login");
        }
    }

    $scope.fingerprintLogin=function(){
      
    }

});