// nicolajsapp.controller('loginCtrl', function($scope) {
NyvangApp.controller('page2Ctrl', function($scope) {

})
      
.controller('statisticsThisMonthCtrl', function($scope) {
   
})
   
.controller('totalsCtrl', function($scope) {

})
   
.controller('addEntryCtrl', ['$scope', '$ionicModal', '$ionicLoading', 'dataService', 
      function($scope, $ionicModal, $ionicLoading, dataService) {
      $ionicModal.fromTemplateUrl('electricity-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
      }).then(function(modal) {
            $scope.modal = modal;
      });
      $scope.openModal = function() {
            $scope.modal.show();
      };
      $scope.closeModal = function() {
            $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
            $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
            // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
            // Execute action
      });


      $scope.electrityForm = {};
      $scope.electrityForm.month = "";
      $scope.electrityForm.kwh = "";
      $scope.electrityForm.price = "";

      $scope.electrityForm.submit = function(item, event) {
            $ionicLoading.show({template: 'Saving...'});
            console.log("form submitted");
            var data = {
                  use: $scope.electrityForm.kwh,
                  price: $scope.electrityForm.price
            }

            var m = new Date($scope.electrityForm.month).getMonth();

           // storageE.setItem(m, data)
          
            dataService.set(m, data);
          
            //DataService.data.set('username': 'ifedi', 'fullname': { firstname: 'Ifedi', lastname: 'Okonkwo'});
            //data.set(m, 'Electricity': { use: $scope.electrityForm.kwh, price: $scope.electrityForm.price });
            // storageE.setItem(m, $scope.electrityForm.kwh)
            if(dataService.get(m)){
                  console.log("saved!")
                  $scope.electrityForm.clear();
            }
            $ionicLoading.hide();
      }





}])
   
.controller('aboutCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {
       
});
 