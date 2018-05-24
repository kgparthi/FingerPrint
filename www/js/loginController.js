app.controller('LoginCtrl',function($scope, $ionicPlatform, $state, $ionicPopup){

  $scope.$on('$ionicView.beforeEnter', _init);

  function _init(){
    $scope.showFingerprint=false;
    $scope.auth={
      username:'',
      password:''
    }
    $scope.isFingerprint=false;
    if(!$scope.rememberMe){
      $scope.rememberMe={
        checked:false
      };
    }

    user = JSON.parse(localStorage.getItem('user'));
    user = user ? user : {'remember': false};
    $scope.rememberMe.checked = user.remember ? user.remember: false;

    if($scope.rememberMe.checked ){
      $scope.auth.username=user.username;
      $scope.showFingerprint=true;
    }
  }

  $ionicPlatform.ready(function() {
      //Is available
    if (typeof window.Fingerprint != 'undefined') {
      window.Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);
      $scope.available = "Not checked";
      $scope.isFingerprint=false;

      function isAvailableSuccess(result) {
        $scope.available = "Fingerprint available";
        $scope.isFingerprint=true;
      }

      function isAvailableError(message) {
        $scope.available = "isAvailableError(): " + JSON.stringify(message);
        console.error(message);
        $scope.isFingerprint=false;
      }
    }
  });

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Alert!',
      template: 'Invalid Username or Password!!'
    });
  }

  $scope.saveLogin = function (){
    var localStorageObj = {'username': $scope.username, 'remember': $scope.rememberMe.checked};
    localStorage.setItem('user',JSON.stringify(localStorageObj));
    $scope.rememberMe={checked : $scope.rememberMe.checked };
  }  

  $scope.fingerprintLogin = function(){
      //Authenticate
      window.Fingerprint.show({
        clientId: "Fingerprint-Demo",
        clientSecret: "password"
      }, successCallback, errorCallback);
      
      function successCallback(){
        //alert("Authentication successfull");
        $state.go('dashboard');
      }
      
      function errorCallback(err){
        alert("Authentication invalid " + err);
        $scope.isFingerprint=false;
      }
  };

  $scope.login=function(auth){
    if($scope.auth.username && $scope.auth.password){
      if($scope.rememberMe.checked){
        console.log("$scope",$scope);
        var localStorageObj = {'username': $scope.auth.username, 'remember': $scope.rememberMe.checked};
        localStorage.setItem('user', JSON.stringify(localStorageObj));
      }else{
        localStorage.removeItem('user');
      }
      $state.go('dashboard');
      $scope.auth={
        username:'',
        password:''
      }
    }else{
      this.showAlert();
    }
    
  }
});