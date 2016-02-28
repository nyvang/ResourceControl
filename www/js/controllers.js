// nicolajsapp.controller('loginCtrl', function($scope) {
NyvangApp.controller('page2Ctrl', function($scope) {

})
      
.controller('statisticsThisMonthCtrl', function($scope) {
   
})
   
.controller('totalsCtrl', function($scope) {

})
   
.controller('addEntryCtrl', ['$scope', '$ionicModal', '$ionicLoading', 'dataService', '$window',
    function($scope, $ionicModal, $ionicLoading, dataService, $win) {

    $scope.electrityForm = {};
    $scope.electrityForm.month = "";
    $scope.electrityForm.kwh = "";
    $scope.electrityForm.price = "";
    $scope.electrityForm.modalTitle = "Add new entry";

    var modalOptions = {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true,
        backdropClickToClose: true,
        hardwareBackButtonClose: true
    }

    const FAKE_SAVE_DELAY = 500;


    /* Form
     ----------------------------------*/

    $scope.electrityForm.submit = function(item, event) {
        $ionicLoading.show({template: 'Saving...'});
        //------------------------------------------------- log //
        console.log("form submitted");
        var data = {
              use: $scope.electrityForm.kwh,
              price: $scope.electrityForm.price
        }

        var m = new Date($scope.electrityForm.month).getMonth();

        // storageE.setItem(m, data)
        $win.setTimeout(function(){
            dataService.set(m, data);
        
            if(dataService.get(m)){
                  //------------------------------------------ log //
                  console.log("saved!")
                  $scope.electrityForm.reset();
            }
            $ionicLoading.hide();
        }, FAKE_SAVE_DELAY);
    }

    $scope.electrityForm.reset = function() {
        $scope.electrityForm.month = "";
        $scope.electrityForm.kwh = "";
        $scope.electrityForm.price = "";
    }

    $scope.electrityForm.close = function() {
        if($scope.modal.isShown()) {
            $scope.closeModal();
        }
    }

    /* Modal
     ----------------------------------*/

    $ionicModal.fromTemplateUrl('electricity-modal.html', modalOptions)
    .then(function(modal) {
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
    
    // end addEntry Controller
}]) 
   
.controller('aboutCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {

});
 