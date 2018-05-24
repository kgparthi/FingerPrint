app.controller('DashCtrl',function($scope, $state, $ionicPopup){
    $scope.logout=function(){
        this.showConfirm();
    };

    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Sign out',
          template: 'Are you sure want to Logout?'
        });
     
        confirmPopup.then(function(res) {
          if(res) {
            $state.go('login');
          } else {
            console.log('You are not sure');
          }
        });
      };
});